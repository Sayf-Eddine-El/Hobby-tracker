const handleVerifyToken = async (token) => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/auth/check-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

export default handleVerifyToken;
