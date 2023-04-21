import mongo from "mongodb"
const dbURI = process.env.DB_URI;
const MongoClient = require('mongodb').MongoClient;

export async function GET(request: Request) {
  return new Response('no')
}
export async function POST(request: Request) {
  const data = await request.json();
  try {
    const client = await MongoClient.connect(dbURI);
    console.log('Connected successfully to server');
    const db = client.db("leaderboard");
    const scoresCollection = db.collection('score');
    const { value, username } = data;
    const result = await scoresCollection.insertOne({ value, username });
    console.log(`Inserted new score with ID: ${result.insertedId}`);
    const docs = await scoresCollection.find({}).toArray();
    console.log('Updated leaderboard:');
    console.log(docs);
    client.close();
    return docs;
  } catch (err) {
    console.error(err);
    throw err;
  }
  /*
  const url = 'http://127.0.0.1:8090/api/collections/leaderboards/records';
  
  const data = await request.json();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score:JSON.stringify(data) })
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Record created successfully', result);
    return new Response(result);
  } else {
    return new Response(response.status.toString());
  }
  */
}