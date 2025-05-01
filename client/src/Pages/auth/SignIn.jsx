import FormCard from "../../components/auth/FormCard";
import Header from "../../components/layouts/Header";
import { useState } from "react";

const SignIn = () => {
  const [userData, setUserData] = useState({});
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header type="Sign In" />
      <FormCard userData={userData} setUserData={setUserData} type="Sign In" />
    </div>
  );
};

export default SignIn;
