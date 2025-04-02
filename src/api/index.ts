export async function searchSkills(query: string) {
  const params = new URLSearchParams({ q: query });

  const response = await fetch(
    `https://react-redux-saga-one-bac.onrender.com/api/search?${params}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
