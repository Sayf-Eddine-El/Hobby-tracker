export default async function handleAddProgress(data) {
  try {
    await fetch("http://localhost:3000/api/v1/progress/add-progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        hobbieId: data.hobbieId,
        timeSpend: Number(data.timeSpend),
      }),
    });
  } catch (e) {
    console.log(e);
  }
}
