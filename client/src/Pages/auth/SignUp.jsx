import { useState } from "react";
import FormCard from "../../components/auth/FormCard.jsx";
import Header from "../../components/layouts/Header.jsx";

const SignUp = () => {
  const [userData, setUserData] = useState({});

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header type="Sign Up" />
      <FormCard type="Sign Up" userData={userData} setUserData={setUserData} />
    </div>
  );
};

export default SignUp;
