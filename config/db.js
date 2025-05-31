import MongoClient from 'mongodb';

const uri = process.env.MONGODB_URI; // ta chaîne de connexion MongoDB
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env');
}

if (process.env.NODE_ENV === 'development') {
  // En développement, utilise une variable globale pour éviter plusieurs connexions
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En production, nouvelle connexion unique par instance
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('easybite'); // nom de ta DB

    // Exécute tes requêtes ici, par ex. lire une collection
    const items = await db.collection('ta_collection').find({}).toArray();

    res.status(200).json({ data: items });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
