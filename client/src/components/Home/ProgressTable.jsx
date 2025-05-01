import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetToken from "../../lib/cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import handleGetProgress from "../../api/handleGetProgress";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import handleGetHobbies from "../../api/handleGetHobbies";
import handleAddProgress from "../../api/handleAddProgress";

import { useQueryClient } from "@tanstack/react-query";
import handleDeleteProgress from "../../api/handleDeleteProgress";

export default function ProgressTable() {
  const token = useGetToken();
  const queryClient = useQueryClient();

  const [addProgress, setAddProgress] = useState({
    hobbieId: "",
    timeSpend: "",
  });

  const { data } = useQuery({
    queryKey: ["progress"],
    queryFn: () => handleGetProgress(token),
  });

  const { data: hobbieData } = useQuery({
    queryKey: ["hobbie"],
    queryFn: () => handleGetHobbies(token),
  });

  const { mutate } = useMutation({
    mutationFn: handleAddProgress,
    onSuccess: () => {
      queryClient.invalidateQueries(["progress"]);
    },
  });
  const { mutate: deleteProgress } = useMutation({
    mutationFn: handleDeleteProgress,
    onSuccess: () => {
      queryClient.invalidateQueries(["progress"]);
    },
  });
  return (
    <div className="w-3/4 flex flex-col items-center justify-center gap-10">
      <div className="flex flex-row justify-between p-2 w-full items-center">
        <h1 className="text-3xl font-bold text-center">Your Progress</h1>
        <Dialog>
          <DialogTrigger>
            <IoIosAdd className="size-9 hover:scale-105 cursor-pointer border-2 border-black rounded-sm" />
          </DialogTrigger>
          <DialogContent className="border-2 border-black">
            <DialogHeader>
              <DialogTitle>Add progress</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4">
                <label className="font-bold">Time Spended (in hour)</label>
                <input
                  type="number"
                  className="p-2 border-2 border-black rounded-sm"
                  placeholder="Time spended"
                  onChange={(e) =>
                    setAddProgress((prev) => ({
                      ...prev,
                      timeSpend: e.target.value,
                    }))
                  }
                />
                <label className="font-bold">Select your hobbie</label>
                <select
                  onChange={(e) =>
                    setAddProgress((prev) => ({
                      ...prev,
                      hobbieId: e.target.value,
                    }))
                  }
                  className="p-2 border-2 border-black rounded-sm"
                >
                  <option value="">Select a Hobbie</option>
                  {hobbieData?.data?.map((e, i) => (
                    <option value={e.id} key={i}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={() =>
                  mutate({
                    token,
                    hobbieId: addProgress.hobbieId,
                    timeSpend: addProgress.timeSpend,
                  })
                }
                className="cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>A list of your progresses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Progress name</TableHead>
            <TableHead className="font-bold text-center">Time spend</TableHead>
            <TableHead className="font-bold text-center">
              Time achieved
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((progress, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{progress.name}</TableCell>
              <TableCell className="text-center">
                {progress.timespend} h
              </TableCell>
              <TableCell className="text-center">
                {progress.progressCreation}
              </TableCell>
              <TableCell className="text-center">
                <MdDelete
                  onClick={() =>
                    deleteProgress({ token, progressId: progress.progressId })
                  }
                  className="cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
