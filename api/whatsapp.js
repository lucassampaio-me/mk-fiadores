const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('mk-fiadores');
    const collection = db.collection('whatsapp_numbers');

    const number = await collection.findOneAndUpdate(
      { active: true },
      {
        $inc: { assignment_count: 1 },
        $set: { last_assigned_at: new Date() }
      },
      {
        sort: { assignment_count: 1, last_assigned_at: 1 },
        returnDocument: 'after'
      }
    );

    if (!number) {
      res.status(404).json({ error: 'No active numbers found' });
      return;
    }

    res.status(200).json({ phoneNumber: number.phone_number });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
