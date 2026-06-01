import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function GET() {
  try {
    let events = await redis.lrange('events', 0, -1);
    if (!events) events = [];
    events = events.map(e => typeof e === 'string' ? JSON.parse(e) : e);
    return Response.json({ events });
  } catch (error) {
    console.error('Redis error:', error);
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
      if (!event.date || !event.name) {
        return Response.json({ error: 'Data e nome obbligatori' }, { status: 400 });
      }
      const newEvent = {
        id: Date.now().toString(),
        date: event.date,
        name: event.name,
        venue: event.venue || '',
        category: event.category || 'Night Club',
        budget: event.budget || 'mid'
      };
      // Prova a scrivere su Redis
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
