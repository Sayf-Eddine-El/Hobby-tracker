export default async function handleDeleteGoal({ token, goalId }) {
  try {
    await fetch("http://localhost:3000/api/v1/goal/delete-goal", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        goalId,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}
