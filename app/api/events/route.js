export const dynamic = 'force-dynamic';

import { Redis } from '@upstash/redis';

let redisClient = null;
function getRedis() {
  if (redisClient) return redisClient;
  // Usa le variabili d'ambiente REST (https)
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    console.error('Redis REST credentials missing');
    return null;
  }
  redisClient = new Redis({ url, token });
  return redisClient;
}

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return Response.json({ events: [] });
    let events = await redis.lrange('events', 0, -1);
    events = (events || []).map(e => typeof e === 'string' ? JSON.parse(e) : e);
    return Response.json({ events });
  } catch (error) {
    console.error('Redis GET error:', error);
    return Response.json({ events: [] });
  }
}

export async function POST(request) {
  try {
    const redis = getRedis();
    if (!redis) return Response.json({ error: 'Redis not configured' }, { status: 500 });
    const body = await request.json();
    const { secret, action, event } = body;
    const adminSecret = process.env.ADMIN_SECRET;
    const isAuthorized = adminSecret && secret === adminSecret;
    if (action === 'auth') return Response.json({ success: isAuthorized });
    if (!isAuthorized) return Response.json({ error: 'Unauthorized' }, { status: 403 });
    if (action === 'add') {
      if (!event.name) return Response.json({ error: 'Name required' }, { status: 400 });
      const newEvent = {
        id: Date.now().toString(),
        name: event.name,
        date: event.date || null,
        venue: event.venue || '',
        category: event.category || 'Service',
        budget: event.budget || 'mid',
        ...(event.cuisine && { cuisine: event.cuisine }),
        ...(event.priceRange && { priceRange: event.priceRange }),
        ...(event.note && { note: event.note }),
        ...(event.serviceType && { serviceType: event.serviceType }),
        ...(event.location && { location: event.location }),
        ...(event.type && { type: event.type })
      };
      await redis.rpush('events', JSON.stringify(newEvent));
      return Response.json({ success: true, event: newEvent });
    }
    if (action === 'delete') {
      const all = await redis.lrange('events', 0, -1);
      const filtered = all.filter(e => {
        const obj = typeof e === 'string' ? JSON.parse(e) : e;
        return obj.id !== event.id;
      });
      await redis.del('events');
      if (filtered.length) await redis.rpush('events', ...filtered.map(e => JSON.stringify(e)));
      return Response.json({ success: true });
    }
    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
