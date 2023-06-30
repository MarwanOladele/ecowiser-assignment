import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Pagination from "../pagination/Pagination";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // number of items per page
  const itemsPerPage = 6;

  // calculate total number of pages
  const totalPages = Math.ceil(notes.length / itemsPerPage);

  // Calculate the index of the first and last items of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items for the current page
  const currentItems = notes
    .sort((a, b) => a.createdAt - b.createdAt)
    .slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      setNotes(Object.values(data));
    });
  }, []);

  // Pagination next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination prev page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="w-full mt-10 h-[60vh]">
      <div className="w-5/6 mx-auto flex flex-wrap justify-around items-start gap-4 h-full">
        {currentItems.map((note) => (
          <div
            className="w-[32%] border-[1px] dark:border-gray-400 rounded border-solid h-[28vh]"
            key={note.uuid}
          >
            {note.title}
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </section>
  );
};

export default Note;
