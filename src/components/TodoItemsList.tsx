import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import SingleTodoItem from "./singleTodoItem";

interface Proptypes {
  openModal: () => void;
}

const TodoItemsList = ({ openModal }: Proptypes) => {
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
      <section className="mt-8 w-full flex flex-col gap-3">
        <div className="w-full flex rounded-md gap-4 sm:gap-6 h-[56px] p-2 justify-between bg-gray-100">
          <button
            className="flex rounded justify-center items-center basis-1/3 h-full p-1 
              "
          >
            All
          </button>
          <button className="flex rounded justify-center items-center basis-1/3 h-full p-1">
            Pending
          </button>
          <button className="flex rounded justify-center items-center basis-1/3 h-full p-1">
            Completed
          </button>
        </div>
        <article className="w-[300px] mt-4 flex items-center gap-4 px-4 pr-2 border border-black/30 rounded h-[44px]">
          <input
            type="text"
            name=""
            id=""
            className="w-full h-full bg-transparent border-none ring-0 focus:outline-none outline-none focus:ring-transparent "
          />
          <button className="p-2 font-medium h-[90%] w-[40px] bg-white rounded-lg text-[16px]">
            <BiSearch className="w-6 h-6 fill-black/60" />
          </button>
        </article>
        <div className="mt-10 flex flex-col gap-1">
          <SingleTodoItem />
          <SingleTodoItem />
        </div>
      </section>
    </article>
  );
};

export default TodoItemsList;
