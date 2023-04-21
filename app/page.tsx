import Image from 'next/image'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import './globals.css'
//const mongo = require('mongodb');
import mongo from "mongodb"
const dbURI = "mongodb+srv://neddslayer32:1VriAZ5dg55pBoWh@cluster0.jdq8qyd.mongodb.net/?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
//const dbURI = process.env.DB_URI;
// 1VriAZ5dg55pBoWh
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
            
  var config = {
    method: 'POST',
    url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-eslhb/endpoint/data/v1/action/find',
    cache: "no-cache", 
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'S6PDd0p1XO84hYdJZhLKn9DIFO7BLVxHqbr4hspjF3KqPfDGPfud76teCkTs8jOS',
    },
    body: data
  };
  const response = await fetch("https://us-east-1.aws.data.mongodb-api.com/app/data-eslhb/endpoint/data/v1/action/find",  {
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
  console.log(bruh?.documents);
  return bruh?.documents;
}

export default async function Home() {

  const leaderboard = await getLeaderboard();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {leaderboard?.sort((a: { value: number; }, b: { value: number; }) => a.value - b.value).map((section: { id: any; }) => {
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
/*
var axios = require('axios');
var data = JSON.stringify({
    "collection": "score",
    "database": "leaderboard",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-eslhb/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'ep0rXUYuIDDP2x7sy2oogrmV5w8X2zf9qToi0qMhvip9C2C5T6XNckbYwqxhFqXe',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
*/