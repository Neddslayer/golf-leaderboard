export async function GET(request: Request) {
  return new Response('no')
}
export async function POST(request: Request) {
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
}