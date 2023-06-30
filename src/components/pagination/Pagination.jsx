import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="min-h-[5vh] mt-4">
      <div className="w-full h-full flex justify-center">
        <div className="flex gap-3 h-full w-2/6 mx-auto items-center  justify-center ">
          <button onClick={onPrevPage} disabled={currentPage === 1}>
            <BsFillArrowLeftSquareFill size={30} className="text-[#6c6b6b]"/>
          </button>
          <span className="">
            {currentPage} of {totalPages}
          </span>
          <button onClick={onNextPage} disabled={currentPage === totalPages}>
            <BsFillArrowRightSquareFill size={30} className="text-[#6c6b6b]"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
