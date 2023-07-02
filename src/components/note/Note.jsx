import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Pagination from "../pagination/Pagination";
import { MdDelete } from "react-icons/md";
import { BsPinFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Update from "../update/Update";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    tagline: "",
    note: "",
    pinned: false,
  });
  const [tempuuid, setTempuuid] = useState("");

  // number of items per page
  const itemsPerPage = 6;

  // calculate total number of pages
  const totalPages = Math.ceil(notes.length / itemsPerPage)

  // Calculate the index of the first and last items of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items for the current page
  const currentItems = notes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNotes(Object.values(data));
      } else {
        setNotes([]);
      }
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

  const handleDelete = (note) => {
    // e.stopPropagation();
    remove(ref(db, `/${note.uuid}`));
    toast.error("Note deleted");
  };

  const handleShowUpdate = (note) => {
    setIsEdit(true);
    setTempuuid(note.uuid);
    setNewNote({
      ...newNote,
      title: `${note.title}`,
      tagline: `${note.tagline}`,
      note: `${note.note}`,
    });
  };

  return (
    <section className="w-full mt-8 h-[60vh]">
      {isEdit && (
        <Update
          newNote={newNote}
          setNewNote={setNewNote}
          tempuuid={tempuuid}
          setIsEdit={setIsEdit}
        />
      )}
      <div className="w-5/6 mx-auto flex flex-wrap justify-start items-start gap-4 h-full">
        {currentItems?.reverse().map((note) => (
          <div
            className="w-[389px] border-[1px] border-[#8ec09f] rounded border-solid h-[28vh] p-3 pt-7 border-t-[25px] relative shadow-md z-1"
            key={note.uuid}
            onClick={() => handleShowUpdate(note)}
          >
            <div className="text-[16px] font-bold">
              <span className=" ">Title:</span> <span>{note.title}</span>
            </div>
            <div className="text-[15px]">
              <span className="font-normal">Tagline:</span>{" "}
              <span>{note.tagline}</span>
            </div>
            <div className="text-[13px] font-extralight">
              <span className=" ">Note:</span> <span>{note.note}</span>
            </div>
            <div
              className="absolute top-1 right-3 flex gap-1 items-center z-11"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="">
                <MdDelete
                  size={24}
                  className=" text-[#8ec09f] cursor-pointer"
                  onClick={() => {
                    handleDelete(note);
                  }}
                />
              </div>
              <div className="">
                <BsPinFill
                  size={24}
                  className="cursor-pointer text-[#8ec09f] z-11"
                />
              </div>
            </div>
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
