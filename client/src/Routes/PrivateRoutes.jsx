import { Navigate, Outlet } from "react-router-dom";
import useGetToken from "../lib/cookie";
import handleVerifyToken from "../api/auth/handleVerifyToken";
import { useEffect } from "react";
import { useState } from "react";

const PrivateRoutes = ({ path }) => {
  const token = useGetToken();
  const [verify, setVerify] = useState();

  useEffect(() => {
    const verification = async () => {
      const data = await handleVerifyToken(token);
      setVerify(data.success);
    };
    verification();
  }, [token]);

  if (verify != undefined) {
    if (path == "/sign-up") {
      return <>{verify == true ? <Outlet /> : <Navigate to={path} />}</>;
    }
    if (path == "/home") {
      return <>{verify == false ? <Outlet /> : <Navigate to={path} />}</>;
    }
  }
};

export default PrivateRoutes;
