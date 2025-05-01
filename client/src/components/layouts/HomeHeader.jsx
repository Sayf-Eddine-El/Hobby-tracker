import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "../../hooks/useUser";
export default function HomeHeader() {
  const { data, isPending, isError } = useUser();

  return (
    <nav className="w-3/4 p-4 flex justify-between">
      <h1 className="font-bold text-3xl">Hobbie Worker</h1>
      {isPending ? (
        <h1>Loading ...</h1>
      ) : (
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="font-bold">
            {data?.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      )}
    </nav>
  );
}
