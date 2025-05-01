import useGetWeekProgress from "../../hooks/useGetWeekProgress";
import { useQuery } from "@tanstack/react-query";
import useGetToken from "../../lib/cookie";
import handleGetGoal from "../../api/handleGetGoal";
import handleGetHobbies from "../../api/handleGetHobbies";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import handleDeleteHobbie from "../../api/handleDeletHobbie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import handleAddHobbie from "../../api/handleAddHobbie";
import { useState } from "react";
import handleAddGoal from "../../api/handleAddGoals";
import handleDeleteGoal from "../../api/handleDeleteGoal";

export default function Cards({ name }) {
  let progressData;
  const token = useGetToken();
  const queryClient = useQueryClient();
  const [addData, setAddData] = useState();

  if (name == "Time spend this week") {
    progressData = useGetWeekProgress();
  }

  const { data: goalData } = useQuery({
    queryKey: ["goals"],
    queryFn: () => handleGetGoal(token),
    enabled: name == "Your goals",
  });

  const { data: hobbieData } = useQuery({
    queryKey: ["hobbie"],
    queryFn: () => handleGetHobbies(token),
  });

  const { mutate: delHobbieMutation } = useMutation({
    mutationFn: handleDeleteHobbie,
    onSuccess: () => {
      queryClient.invalidateQueries(["hobbie"]);
    },
  });
  const { mutate: addHobbieMutation } = useMutation({
    mutationFn: handleAddHobbie,
    onSuccess: () => {
      queryClient.invalidateQueries(["hobbie"]);
    },
  });
  const { mutate: addGoalMutation } = useMutation({
    mutationFn: handleAddGoal,
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"]);
    },
  });

  const { mutate: deleteGoalMUtation } = useMutation({
    mutationFn: handleDeleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"]);
    },
  });

  return (
    <div className="shadow-xl size-96 overflow-hidden p-4 rounded-sm border-2 gap-4 border-black">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-bold text-center p-2">{name}</h1>
        {name != "Time spend this week" && (
          <Dialog>
            <DialogTrigger>
              <IoIosAdd className="size-9 border-2  border-black p-2 rounded-sm cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="border-2 border-black">
              <DialogHeader>
                <DialogTitle>
                  {name != "Your goals" ? "Add Hobbie" : "Add Goals"}
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 p-4">
                {name == "Your goals" && (
                  <div className="flex flex-col gap-4">
                    <label className="font-bold">Time to spend (in hour)</label>
                    <input
                      type="number"
                      className="p-2 border-2 border-black rounded-sm"
                      placeholder="Time to spend"
                      onChange={(e) =>
                        setAddData((prev) => ({
                          ...prev,
                          timeToSpend: e.target.value,
                        }))
                      }
                    />
                    <label className="font-bold">Dead line</label>
                    <input
                      type="date"
                      className="p-2 border-2 border-black rounded-sm"
                      placeholder="Dead Line"
                      onChange={(e) =>
                        setAddData((prev) => ({
                          ...prev,
                          deadLine: e.target.value,
                        }))
                      }
                    />
                    <label className="font-bold">Select hobbie</label>
                    <select
                      onChange={(e) =>
                        setAddData((prev) => ({
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
                )}
                <label className="font-bold">
                  {name != "Your goals"
                    ? "Enter your hobbie name"
                    : "Enter your goals name"}
                </label>
                <input
                  className="p-2 border-2 border-black rounded-sm"
                  type="text"
                  placeholder={
                    name != "Your goals"
                      ? "Enter your hobbie name"
                      : "Enter your goals name"
                  }
                  onChange={(e) =>
                    setAddData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <Button
                  onClick={
                    name == "Your hobbies"
                      ? () => addHobbieMutation({ token, name: addData.name })
                      : () => addGoalMutation({ token, addData })
                  }
                  className="cursor-pointer"
                >
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="overflow-y-scroll h-full p-3 flex flex-col gap-3">
        {name == "Time spend this week"
          ? progressData?.data?.data?.weekProgressDate.map((e, i) => (
              <div
                key={i}
                className="flex w-min-full border-2 p-2 rounded-sm border-black flex-row justify-around"
              >
                <h1 className="font-bold">{e.name}</h1>
                <h1>
                  {e.timespend >= 1
                    ? `${e.timespend} h`
                    : `${e.timespend * 100} min`}
                </h1>
                <h1>{e.day}</h1>
              </div>
            ))
          : name == "Your goals"
          ? goalData?.data?.map((e, i) => (
              <div
                key={i}
                className="p-4 flex flex-col gap-2 justify-center items-center border-2 border-black rounded-sm"
              >
                <h1 className="font-bold text-center">{e.name}</h1>
                <div className="flex flex-row justify-between items-center gap-2">
                  <h1>{e.totalTimeSpend} h</h1>
                  <progress
                    className="text-blue-600 rounded-sm"
                    max={e.timeToSpend}
                    value={e.totalTimeSpend}
                  ></progress>
                  <h1>{e.timeToSpend} h</h1>
                  <MdDelete
                    onClick={() =>
                      deleteGoalMUtation({ token, goalId: e.goalId })
                    }
                    className="cursor-pointer size-5 hover:scale-105"
                  />
                </div>
              </div>
            ))
          : hobbieData?.data?.map((e, i) => (
              <div
                key={i}
                className="border-2 flex flex-row justify-between items-center border-black p-3 rounded-sm"
              >
                <h1 className="font-bold">{e.name}</h1>
                <div className="flex flex-row gap-4 ">
                  <MdDelete
                    onClick={() => delHobbieMutation({ hobbieId: e.id, token })}
                    className="cursor-pointer size-5 hover:scale-105"
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
