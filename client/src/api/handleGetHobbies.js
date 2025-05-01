export default async function handleGetHobbies(id) {
  try {
    const res = await fetch("http://localhost:3000/api/v1/hobbie/get-hobbie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}
