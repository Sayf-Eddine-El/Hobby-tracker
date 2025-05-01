import { useCookies } from "react-cookie";

const useGetToken = () => {
  const [cookie, setCookie] = useCookies(["token"]);

  return cookie?.token;
};

export default useGetToken;
