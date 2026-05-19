import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDatabase() {
  const mongoClient = await getMongoClient();
  return mongoClient.db(process.env.MONGODB_DB ?? "sahli_prints");
}
