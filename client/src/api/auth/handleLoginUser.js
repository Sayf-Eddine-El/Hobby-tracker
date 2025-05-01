import toast from "react-hot-toast";

export default async function handleLoginUser(e, userData, setError, navigate) {
  try {
    const res = await fetch("http://localhost:3000/api/v1/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      if (data.message.message == "The information incorrect") {
        toast.error(data.message.message);
      } else {
        setError(data.message);
      }
    } else {
      toast.success(data.message);
      navigate("/home");
    }
  } catch (e) {
    console.log(e);
  }
}
