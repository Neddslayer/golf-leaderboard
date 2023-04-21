import Image from 'next/image'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

async function getLeaderboard() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/leaderboards/records', { cache: 'no-store' });
  const data = await res.json();
  return data?.items as any[];
}

export default async function Home() {

  const leaderboard = await getLeaderboard();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {leaderboard?.sort((a, b) => a.score.value - b.score.value).map((section) => {
        return <LeaderboardSection key={section.id} note={section} />;
      })}
    </main>
  )
}
function LeaderboardSection({ note }: any) {
  const { score } = note || {};

  return (
    <div className='grid-container' style={{width:'100%', fontSize:'1.5rem', padding: 20}}>
      <h2 className='grid-item username' style={inter.style}>{score.username}</h2>
      <h2 className='grid-item value' style={inter.style}>{score.value}</h2>
    </div>
  );
}
