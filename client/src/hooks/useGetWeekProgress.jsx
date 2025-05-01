import { useQuery } from "@tanstack/react-query";
import handleGetWeekProgress from "../api/Progress/handleGetWeekProgress";
import useGetToken from "../lib/cookie";

export default function useGetWeekProgress() {
  const token = useGetToken();
  const { data, isPending, isError } = useQuery({
    queryKey: ["weekProgress", token],
    queryFn: () => handleGetWeekProgress(token),
  });
  return { data, isPending, isError };
}
