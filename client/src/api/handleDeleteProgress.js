const handleDeleteProgress = async ({ token, progressId }) => {
  try {
    await fetch("http://localhost:3000/api/v1/progress/delete-progress", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        progressId,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export default handleDeleteProgress;
