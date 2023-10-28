import { useState } from "react";
import "./App.css";
import { TodoItemType } from "./utils/libs/types";
import TodoItemsList from "./components/TodoItemsList";
import CreateTask from "./components/modals/CreateTask";

function App() {
  const [taskList, setTaskList] = useState<TodoItemType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const pendingTasks = taskList.filter((task) => task.status === "pending");
  const completedTasks = taskList.filter((task) => task.status === "completed");

  return (
    <>
      <CreateTask
        isOpen={isOpen}
        closeModal={closeModal}
        setTaskList={setTaskList}
      />
      <div className=" min-h-screen w-full flex justify-center ">
        <section className="w-[768px] max-w-[92%] sm:max-w-[80%] mt-[40px]">
          <article className="px-4 sm:px-[40px] py-[60px] bg-[#fff] rounded-md sm:rounded-lg">
            <h2 className="font-bold font-Montserrat text-[28px] sm:text-[32px] leading-10 tracking-[0.32px]">
              Welcome back
            </h2>
            <div className="flex flex-col gap-3 mt-8">
              <h4 className="font-medium ">
                You have {taskList.length} total tasks
              </h4>
              <h4 className="text-orange-700 font-medium">
                You have {pendingTasks.length} pending tasks
              </h4>
              <h4 className="text-green-700 font-medium">
                You have {completedTasks.length} completed tasks
              </h4>
            </div>
          </article>
          <TodoItemsList
            taskList={taskList}
            openModal={openModal}
            setTaskList={setTaskList}
          />
        </section>
      </div>
    </>
  );
}

export default App;
