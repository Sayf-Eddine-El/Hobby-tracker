export default async function handleAddHobbie(data) {
  try {
    console.log(data);
    await fetch("http://localhost:3000/api/v1/hobbie/post-hobbie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}
