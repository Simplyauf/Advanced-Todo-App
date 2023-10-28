import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { TodoItemType } from "../utils/libs/types";
import { useEffect, useRef, useState } from "react";

interface PropTypes {
  data: TodoItemType;
  currentTab: string;
  setTaskList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  taskList: TodoItemType[];
}
const SingleTodoItem = ({
  currentTab,
  setTaskList,
  data,
  taskList,
}: PropTypes) => {
  const { id, date, title, status } = data;

  const [statusCheck, setStatusCheck] = useState(
    status === "completed" ? true : false
  );

  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setStatusCheck(status === "completed" ? true : false);

    if (checkBoxRef && checkBoxRef.current) {
      checkBoxRef.current.checked = data.status === "completed" ? true : false;
    }
  }, [currentTab, data.status, taskList]);

  const toggleCompleted = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const status = e.target.checked ? true : false;

    setTaskList((prevData) =>
      prevData.map((task) =>
        task.id === id && status
          ? { ...task, status: "completed" }
          : { ...task, status: "pending" }
      )
    );
  };
  return (
    <>
      <article className="flex items-center w-full gap-3 sm:gap-6 justify-center min-h-[60px] px-[2%] ">
        <input
          type="checkbox"
          name="status-check"
          ref={checkBoxRef}
          value={data.status === "completed" ? "true" : "false"}
          onChange={(e) => toggleCompleted(e, id)}
          id=""
          className="min-w-[24px] min-h-[24px] w-6 h-6 accent-black"
        />
        <div className="w-[60%] sm:w-[75%] flex gap-3  items-center">
          <h3 className="text-lg break-all font-medium basis-2/3">{title}</h3>
          <p className="basis-1/3">{date}</p>
        </div>
        <div className="flex w-auto sm:w-[15%] items-center gap-4 sm:gap-6 justify-end">
          <AiFillEdit className="w-6 h-6 cursor-pointer" />
          <AiFillDelete className="w-6 h-6 cursor-pointer" />
          <MdContentCopy className="w-6 h-6 cursor-pointer" />
        </div>
      </article>
    </>
  );
};

export default SingleTodoItem;
