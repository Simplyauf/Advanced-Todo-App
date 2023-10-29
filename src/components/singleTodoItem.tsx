import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { TodoItemType } from "../utils/libs/types";
import { useState } from "react";
import EditTask from "./modals/EditTask";
import { formatDateTime } from "../utils/formatDateTime";
import { toast } from "react-toastify";

interface PropTypes {
  data: TodoItemType;
  setTaskList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  taskList: TodoItemType[];
}
const SingleTodoItem = ({ setTaskList, data, taskList }: PropTypes) => {
  const { id, date, title, status } = data;

  // edit modal
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const toggleCompleted = (id: string) => {
    status === "pending" && toast.success("Task successfully completed");

    setTaskList((prevData) =>
      prevData.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTaskList((prevData) => prevData.filter((task) => task.id !== id));

    toast.success("Task successfully deleted");
  };

  const copyTaskTitle = (id: string) => {
    const task = taskList.find((task) => task.id === id);

    if (task) {
      navigator.clipboard
        .writeText(task.title)
        .then(() => {
          toast.success("Task successfully copied to clipboard!");
        })
        .catch(() => {
          toast.error("Unable to copy task.Please retry");
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
          checked={data.status === "completed"}
          onChange={() => toggleCompleted(id)}
          className="min-w-[24px] min-h-[24px] w-6 h-6 accent-black cursor-pointer"
        />
        <div className="w-[60%] md:w-[75%] flex gap-3  items-center">
          <h3 className="text-lg break-all font-medium sm:basis-2/3 ">
            {title}
          </h3>
          <p className="basis-1/3 text-[13px] sm:block hidden sm:text-[16px] ">
            {formatDateTime(date)}
          </p>
        </div>
        <div className="flex w-auto sm:w-[20%] items-center gap-3 sm:gap-6 justify-end">
          <AiOutlineEdit
            className="sm:w-6 sm:h-6 w-4 h-4 cursor-pointer "
            onClick={openModal}
          />
          <AiOutlineDelete
            className="sm:w-6 sm:h-6 w-4 h-4 cursor-pointer "
            onClick={() => deleteTask(id)}
          />
          <MdContentCopy
            className="sm:w-6 sm:h-6 w-4 h-4 cursor-pointer "
            onClick={() => copyTaskTitle(id)}
          />
        </div>
      </article>
    </>
  );
};

export default SingleTodoItem;
