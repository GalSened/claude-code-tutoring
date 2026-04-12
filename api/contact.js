export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, track, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    console.log('New contact submission:', { name, email, track, message, timestamp: new Date().toISOString() });

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Internal error' });
  }
}
