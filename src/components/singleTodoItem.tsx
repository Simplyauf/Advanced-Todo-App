import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { TodoItemType } from "../utils/libs/types";
import { useEffect, useRef, useState } from "react";
import EditTask from "./modals/EditTask";

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

  // edit modal
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkBoxRef && checkBoxRef.current) {
      checkBoxRef.current.checked = status === "completed" ? true : false;
    }
  }, [currentTab, status, taskList]);

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

  const deleteTask = (id: string) => {
    setTaskList((prevData) => prevData.filter((task) => task.id !== id));
  };

  const copyTaskTitle = (id: string) => {
    const task = taskList.find((task) => task.id === id);

    if (task) {
      navigator.clipboard
        .writeText(task.title)
        .then(() => {
          console.log("Text copied to clipboard successfully!");
        })
        .catch((err) => {
          console.error("Unable to copy text to clipboard: ", err);
        });
    }
  };
  return (
    <>
      <EditTask
        isOpen={isOpen}
        closeModal={closeModal}
        setTaskList={setTaskList}
        data={data}
      />
      <article className="flex items-center w-full gap-3 sm:gap-6 justify-center min-h-[60px] px-[2%] ">
        <input
          type="checkbox"
          name="status-check"
          ref={checkBoxRef}
          value={data.status === "completed" ? "true" : "false"}
          onChange={(e) => toggleCompleted(e, id)}
          id=""
          className="min-w-[24px] min-h-[24px] w-6 h-6 accent-black cursor-pointer"
        />
        <div className="w-[60%] sm:w-[75%] flex gap-3  items-center">
          <h3 className="text-lg break-all font-medium basis-2/3">{title}</h3>
          <p className="basis-1/3">{date}</p>
        </div>
        <div className="flex w-auto sm:w-[15%] items-center gap-4 sm:gap-6 justify-end">
          <AiFillEdit className="w-6 h-6 cursor-pointer" onClick={openModal} />
          <AiFillDelete
            className="w-6 h-6 cursor-pointer"
            onClick={() => deleteTask(id)}
          />
          <MdContentCopy
            className="w-6 h-6 cursor-pointer"
            onClick={() => copyTaskTitle(id)}
          />
        </div>
      </article>
    </>
  );
};

export default SingleTodoItem;
