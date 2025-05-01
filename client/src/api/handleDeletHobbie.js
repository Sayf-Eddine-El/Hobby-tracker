const handleDeleteHobbie = async ({ token, hobbieId }) => {
  try {
    await fetch("http://localhost:3000/api/v1/hobbie/del-hobbie", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        hobbieId: hobbieId,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export default handleDeleteHobbie;
