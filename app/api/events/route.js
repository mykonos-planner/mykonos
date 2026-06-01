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
  const body = await request.json();
  const { secret, action, event } = body;
  
  // PASSWORD FISSA PER TEST: "test123"
  if (secret !== 'test123') {
    return Response.json({ error: 'Non autorizzato' }, { status: 403 });
  }
  
  if (action === 'add') {
    const newEvent = {
      id: Date.now().toString(),
      date: event.date,
      name: event.name,
      venue: event.venue,
      category: event.category,
      budget: event.budget || 'mid'
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
    if (filtered.length) {
      await redis.rpush('events', ...filtered.map(e => JSON.stringify(e)));
    }
    return Response.json({ success: true });
  }
  
  return Response.json({ error: 'Azione sconosciuta' }, { status: 400 });
}
