export const dynamic = 'force-dynamic';

import { Redis } from '@upstash/redis';

// Client Redis lazy (inizializzato solo al primo utilizzo)
let redisClient = null;
function getRedis() {
  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.KV_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  }
  return redisClient;
}

export async function GET() {
  try {
    const redis = getRedis();
    let events = await redis.lrange('events', 0, -1);
    if (!events) events = [];
    events = events.map(e => typeof e === 'string' ? JSON.parse(e) : e);
    return Response.json({ events });
  } catch (error) {
    console.error('Redis GET error:', error);
    return Response.json({ events: [] });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, action, event } = body;
    
    const adminSecret = process.env.ADMIN_SECRET;
    const isAuthorized = adminSecret && secret === adminSecret;
    
    if (action === 'auth') {
      return Response.json({ success: isAuthorized });
    }
    
    if (!isAuthorized) {
      return Response.json({ error: 'Non autorizzato' }, { status: 403 });
    }
    
    if (action === 'add') {
      if (!event.name) {
        return Response.json({ error: 'Il nome è obbligatorio' }, { status: 400 });
      }
      
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
      
      const redis = getRedis();
      await redis.rpush('events', JSON.stringify(newEvent));
      return Response.json({ success: true, event: newEvent });
    }
    
    if (action === 'delete') {
      const redis = getRedis();
      const all = await redis.lrange('events', 0, -1);
      const filtered = all.filter(e => {
        const obj = typeof e === 'string' ? JSON.parse(e) : e;
        return obj.id !== event.id;
      });
      await redis.del('events');
      if (filtered.length) {
        await redis.rpush('events', ...filtered.map(e => JSON.stringify(e)));
      }
      return Response.json({ success: true });
    }
    
    return Response.json({ error: 'Azione sconosciuta' }, { status: 400 });
  } catch (error) {
    console.error('API ERROR:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
