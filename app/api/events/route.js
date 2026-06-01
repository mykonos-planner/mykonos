import { kv } from '@vercel/kv';

export async function GET() {
  try {
    let events = await kv.lrange('events', 0, -1);
    if (!events) events = [];
    events = events.map(e => typeof e === 'string' ? JSON.parse(e) : e);
    return Response.json({ events });
  } catch (error) {
    return Response.json({ events: [] });
  }
}

export async function POST(request) {
  const body = await request.json();
  const { secret, action, event } = body;
  
  const adminSecret = process.env.ADMIN_SECRET;
  if (secret !== adminSecret) {
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
    await kv.rpush('events', JSON.stringify(newEvent));
    return Response.json({ success: true, event: newEvent });
  }
  
  if (action === 'delete') {
    const all = await kv.lrange('events', 0, -1);
    const filtered = all.filter(e => {
      const obj = typeof e === 'string' ? JSON.parse(e) : e;
      return obj.id !== event.id;
    });
    await kv.del('events');
    if (filtered.length) await kv.rpush('events', ...filtered.map(e => JSON.stringify(e)));
    return Response.json({ success: true });
  }
  
  return Response.json({ error: 'Azione sconosciuta' }, { status: 400 });
}