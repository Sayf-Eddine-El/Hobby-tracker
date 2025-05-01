import { Button } from "../ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import handleAddUser from "../../api/auth/handleAddUser";
import handleLoginUser from "../../api/auth/handleLoginUser";
import { useNavigate } from "react-router-dom";

export default function FormCard({ userData, setUserData, type }) {
  const [error, setError] = useState();

  const navigate = useNavigate();

  return (
    <Card className="w-[500px] m-10">
      <CardHeader>
        <CardTitle className="text-3xl">{type}</CardTitle>
        <CardDescription>
          Welcome {type == "Sign In" ? "back" : ""} to Worker , The best place
          to keep track of you progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={
            type == "Sign Up"
              ? (e) => handleAddUser(e, userData, setError)
              : (e) => {
                  e.preventDefault();
                  const isLogin = handleLoginUser(
                    e,
                    userData,
                    setError,
                    navigate
                  );
                }
          }
          className="p-2"
        >
          <div className="grid w-full items-center gap-4">
            {type == "Sign Up" && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  onChange={(e) =>
                    setUserData((prev) => {
                      return {
                        ...prev,
                        name: e.target.value,
                      };
                    })
                  }
                  id="name"
                  placeholder="Enter your of name"
                />
              </div>
            )}
            {error?.name && (
              <h3 className="text-red-500 text-sm">{error.name[0]}</h3>
            )}

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  })
                }
                id="email"
                placeholder="Enter your email"
              />
            </div>
            {error?.email && (
              <h3 className="text-red-500 text-sm">{error.email[0]}</h3>
            )}
            <div className="flex flex-col mb-4 space-y-1.5">
              <Label htmlFor="name">password</Label>
              <Input
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  })
                }
                id="password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
          </div>
          {error?.password && (
            <h3 className="text-red-500 mb-5 text-sm">{error.password[0]}</h3>
          )}
          <Button type="submit" className="w-full mt-2 cursor-pointer">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
