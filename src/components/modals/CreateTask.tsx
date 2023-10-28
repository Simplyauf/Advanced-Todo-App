import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { nanoid } from "nanoid";
import { TodoItemType } from "../../utils/libs/types";

interface Proptypes {
  isOpen: boolean;
  closeModal: () => void;
  setTaskList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
}

const CreateTask = ({ closeModal, isOpen, setTaskList }: Proptypes) => {
  const id = nanoid();

  const [taskDatas, setTaskDatas] = useState({
    title: "",
    date: "",
  });

  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskDatas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: {
      id: string;
      status: "pending" | "completed";
      title: string;
      date: string;
    } = {
      ...taskDatas,
      id,
      status: "pending",
    };

    console.log(formData);

    setTaskList((prev) => [...prev, formData]);

    setTaskDatas({
      title: "",
      date: "",
    });

    closeModal();
  };
  return (
    <section
      className={`fixed flex z-[1000] justify-center items-center top-0 lg:flex lg:justify-center lg:items-center inset-x-0 h-screen w-full duration-200 transition-all ease-in-out duration-400 ${
        isOpen ? "translate-y-0" : "translate-y-[-200%]"
      } `}
    >
      <div
        className={`inset fixed  bg-[#000000] bg-opacity-30 h-screen w-full  z-[1002] `}
      ></div>

      <div className="w-full max-w-[92%] sm:max-w-md transform h-[400px] max-h-[96%] overflow-y-auto rounded-2xl bg-[#fff] text-[#000] p-6 text-left align-middle shadow-xl transition-all relative z-[1003]">
        <div className="w-full justify-between items-center flex mt-2">
          <h3 className="text-lg  font-semibold font-Roboto">Create Task</h3>
          <CgClose className="w-6 h-6 cursor-pointer" onClick={closeModal} />
        </div>
        <form className="flex flex-col gap-4 mt-8" onSubmit={handleCreateData}>
          <div>
            <h6 className="font-Roboto">Task Title</h6>

            <input
              type="text"
              name="title"
              id=""
              required
              placeholder="Task Subject"
              value={taskDatas.title}
              onChange={OnChange}
              className="h-[44px] mt-2 w-full pl-4 bg-gray-100 rounded-md border-transparent focus:outline-none"
            />
          </div>

          <div>
            <h6 className="font-Roboto">Due Date</h6>
            <input
              value={taskDatas.date}
              onChange={OnChange}
              type="datetime-local"
              name="date"
              id="dateTime-picker"
              required
              className="h-[44px] px-6 mt-2 w-full pl-4  bg-gray-100 rounded-md border-transparent focus:outline-none text-[#000]"
            />
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              type="submit"
              className="flex rounded justify-center items-center w-[158px] h-[48px] bg-gray-900 text-[#fff]"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateTask;
