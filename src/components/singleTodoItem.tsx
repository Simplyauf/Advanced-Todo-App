import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";

const SingleTodoItem = () => {
  return (
    <>
      <article className="flex items-center w-full gap-3 sm:gap-6 justify-center min-h-[60px] px-[2%] ">
        <input
          type="checkbox"
          name="status-check"
          id=""
          className="min-w-[24px] min-h-[24px] w-6 h-6 accent-black"
        />
        <div className="w-[60%] sm:w-[75%] flex gap-3  items-center">
          <h3 className="text-lg break-all font-medium basis-2/3">title</h3>
          <p className="basis-1/3">24/05/2023</p>
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
