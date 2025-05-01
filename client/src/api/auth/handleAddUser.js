import toast from "react-hot-toast";

export default async function handleAddUser(e, userData, setError) {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3000/api/v1/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!data.success) {
      if (data.message.message == "The user already exists")
        toast.error(data.message.message);
      else {
        setError(data.message);
      }
    } else {
      toast.success(data.message);
    }
  } catch (e) {
    console.log(e);
  }
}
