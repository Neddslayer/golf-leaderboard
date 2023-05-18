import Image from 'next/image'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import './globals.css'
import { IntegerType } from 'mongodb';
const inter = Inter({ subsets: ['latin'] })

async function getLeaderboard() {
  var data = JSON.stringify({
    "collection": "score",
    "database": "leaderboard",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 0, "value": 1, "username": 1
    }
  });
  const response = await fetch("https://us-central1.gcp.data.mongodb-api.com/app/data-eslhb/endpoint/data/v1/action/find",  {
    method: 'POST',
    cache: "no-cache", 
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'S6PDd0p1XO84hYdJZhLKn9DIFO7BLVxHqbr4hspjF3KqPfDGPfud76teCkTs8jOS',
    },
    body: data
  });
  const bruh = await response.json();
  return bruh?.documents;
}

export default async function Home() {

  const leaderboard = await getLeaderboard();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='grid-container fadeInDown leaderboardTitle'>
        <h2 className='grid-item username' style={inter.style}>Username</h2>
        <h2 className='grid-item value' style={inter.style}>Score</h2>
      </div>
      {leaderboard?.sort((a: { value: number; }, b: { value: number; }) => a.value - b.value).map((section: { id: any; }, index: number) => {
        return <LeaderboardSection note={section} pos={index} key={section.id} />;
      })}
    </main>
  )
}
function LeaderboardSection({ note, pos }: any) {
  const { value, username } = note || {};
  return (
    <div className='grid-container fadeInDown leaderboardPlayer' style={{ animationDelay: pos*100 + "ms" }}>
      <h2 className='grid-item username' style={inter.style}>{username}</h2>
      <h2 className='grid-item value' style={inter.style}>{value}</h2>
    </div>
  );
}
