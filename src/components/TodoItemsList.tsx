import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import SingleTodoItem from "./singleTodoItem";
import { TodoItemType } from "../utils/libs/types";
import { useEffect, useState } from "react";

interface Proptypes {
  openModal: () => void;
  taskList: TodoItemType[];
  setTaskList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
}

const TodoItemsList = ({ openModal, taskList, setTaskList }: Proptypes) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedTask, setSearchedTask] = useState<TodoItemType[] | null>(null);
  const [currentTab, setCurrentTab] = useState("All");
  const [currentTabData, setCurrentTabData] = useState(taskList);

  const pendingTasks = taskList.filter((task) => task.status === "pending");
  const completedTasks = taskList.filter((task) => task.status === "completed");

  useEffect(() => {
    if (currentTab === "Completed") {
      setCurrentTabData(completedTasks);
    } else if (currentTab === "Pending") {
      setCurrentTabData(pendingTasks);
    } else if (currentTab === "All") {
      setCurrentTabData(taskList);
    }
  }, [taskList, currentTab]);

  const handleSearchTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = taskList.filter((task) =>
      task.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedTask(data);
    setSearchQuery(e.target.value);
  };

  return (
    <article className="mt-12 px-[16px] sm:px-[40px] py-[60px] mb-[120px] bg-[#fff] rounded-md sm:rounded-lg">
      <div className="w-full justify-between gap-2 flex items-center">
        <h2 className="font-bold font-Montserrat text-[28px] lg:text-[32px] leading-8 tracking-[0.32px]">
          Task Lists
        </h2>
        <TbSquareRoundedPlusFilled
          className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
          onClick={openModal}
        />
      </div>
      {taskList.length > 0 ? (
        <article className="w-[300px] max-w-[92%] mt-4 flex items-center gap-4 px-4 pr-2 border border-black/30 rounded h-[44px]">
          <input
            type="search"
            name=""
            id=""
            value={searchQuery}
            onChange={handleSearchTask}
            placeholder="Search Tasks"
            className="w-full h-full bg-transparent border-none ring-0 focus:outline-none outline-none focus:ring-transparent "
          />
          <button className="p-2 font-medium h-[90%] w-[40px] bg-white rounded-lg text-[16px]">
            <BiSearch className="w-6 h-6 fill-black/60" />
          </button>
        </article>
      ) : null}
      <section className="mt-8 w-full flex flex-col gap-3">
        {searchQuery.length < 1 ? (
          <div className="w-full flex rounded-md gap-4 sm:gap-6 h-[56px] p-2 justify-between bg-gray-100">
            <button
              className={`flex rounded justify-center items-center basis-1/3 h-full p-1 ${
                currentTab === "All" && "bg-white"
              }`}
              onClick={() => setCurrentTab("All")}
            >
              All
            </button>
            <button
              className={`flex rounded justify-center items-center basis-1/3 h-full p-1 ${
                currentTab === "Pending" && "bg-white"
              }`}
              onClick={() => setCurrentTab("Pending")}
            >
              Pending
            </button>
            <button
              className={`flex rounded justify-center items-center basis-1/3 h-full p-1 ${
                currentTab === "Completed" && "bg-white"
              }`}
              onClick={() => setCurrentTab("Completed")}
            >
              Completed
            </button>
          </div>
        ) : null}

        {searchedTask && searchQuery.length >= 1 ? (
          <div className="mt-10 flex flex-col gap-1">
            {searchedTask.length <= 0 ? (
              <div className="w-full flex justify-center items-center h-[100px]">
                <h2 className="text-xl font-semibold font-Roboto">
                  Searched task not found
                </h2>
              </div>
            ) : (
              searchedTask.map((data) => {
                return (
                  <SingleTodoItem
                    setSearchQuery={setSearchQuery}
                    key={data.id}
                    data={data}
                    setTaskList={setTaskList}
                    taskList={taskList}
                  />
                );
              })
            )}
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-1">
            {currentTabData.length <= 0 ? (
              <div className="w-full flex justify-center items-center h-[100px]">
                <h2 className="text-xl font-semibold font-Roboto">
                  No Available Task
                </h2>
              </div>
            ) : (
              currentTabData.map((data) => {
                return (
                  <SingleTodoItem
                    setSearchQuery={setSearchQuery}
                    key={data.id}
                    data={data}
                    setTaskList={setTaskList}
                    taskList={taskList}
                  />
                );
              })
            )}
          </div>
        )}
      </section>
    </article>
  );
};

export default TodoItemsList;
