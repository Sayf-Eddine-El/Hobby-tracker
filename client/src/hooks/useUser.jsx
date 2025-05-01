import { useEffect, useState } from "react";
import handleVerifyToken from "../api/auth/handleVerifyToken";
import useGetToken from "../lib/cookie";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const token = useGetToken();

  const { data, isPending, isError } = useQuery({
    queryKey: ["user", token],
    queryFn: () => handleVerifyToken(token),
  });

  return { data: data?.data?.data, isPending, isError };
}
