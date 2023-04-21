import Image from 'next/image'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import './globals.css'
//const mongo = require('mongodb');
import mongo from "mongodb"
const dbURI = process.env.DB_URI;
const MongoClient = require('mongodb').MongoClient;
//const dbURI = process.env.DB_URI;
// 1VriAZ5dg55pBoWh
const inter = Inter({ subsets: ['latin'] })

async function getLeaderboard() {
  try {
    const client = await MongoClient.connect(dbURI);
    console.log('Connected successfully to server');
    const db = client.db('leaderboard');
    const scoresCollection = db.collection('score');
    const docs = await scoresCollection.find({}).toArray();
    console.log('Found the following records:');
    console.log(docs);
    client.close();
    return docs;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default async function Home() {

  const leaderboard = await getLeaderboard();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {leaderboard?.sort((a, b) => a.value - b.value).map((section) => {
        return <LeaderboardSection key={section.id} note={section} />;
      })}
    </main>
  )
}
function LeaderboardSection({ note }: any) {
  const { value, username } = note || {};

  return (
    <div className='grid-container' style={{width:'100%', fontSize:'1.5rem', padding: 20}}>
      <h2 className='grid-item username' style={inter.style}>{username}</h2>
      <h2 className='grid-item value' style={inter.style}>{value}</h2>
    </div>
  );
}
