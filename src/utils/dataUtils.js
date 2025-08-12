const BASE_URL = 'http://localhost:3001';

export async function uploadData(data) {
  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: data,
  });
  
  if (!response.ok) {
    throw new Error(`Upload failed with status: ${response.status}`);
  }
  
  return response.json();
}

export async function queryDatabase(queryString) {
  console.log("query database running at", new Date().toISOString())

  const response = await fetch(`${BASE_URL}/database`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryString }),
  });
  
  if (!response.ok) {
    throw new Error(`Query failed with status: ${response.status}`);
  }
  return response.json();
}
