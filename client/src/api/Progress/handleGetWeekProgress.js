export default async function handleGetWeekProgress(token) {
  try {
    const res = await fetch(
      "http://localhost:3000/api/v1/progress/get-streak",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}
