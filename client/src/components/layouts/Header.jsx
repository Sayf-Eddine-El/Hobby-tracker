import { Link } from "react-router-dom";

const Header = ({ type }) => {
  return (
    <div className="flex w-3/4 p-4 flex-row mb-10 justify-between items-center">
      <h1 className="font-bold">Hobbie Worker</h1>
      <Link
        className="border-2 border-black p-2 bg-black text-white rounded-md text-sm font-bold"
        to={type == "Sign Up" ? "/sign-in" : "/sign-up"}
      >
        {type == "Sign Up" ? "Sign In" : "Sign Up"}
      </Link>
    </div>
  );
};

export default Header;
