export default async function handleAddGoal(data) {
  try {
    await fetch("http://localhost:3000/api/v1/goal/add-goal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        name: data.addData.name,
        deadLine: data.addData.deadLine,
        timeToSpend: Number(data.addData.timeToSpend),
        hobbieId: data.addData.hobbieId,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}
