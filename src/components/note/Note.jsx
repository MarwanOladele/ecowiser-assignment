import { onValue, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Pagination from "../pagination/Pagination";
import { MdDelete } from "react-icons/md";
import { BsPinFill } from "react-icons/bs";
import { toast } from "react-toastify";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [tempuuid, setTempuuid] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    tagline: "",
    note: "",
    pinned: false,
  });

  const { title, tagline, note } = newNote;

  // number of items per page
  const itemsPerPage = 6;

  // calculate total number of pages
  const totalPages = Math.ceil(notes.length / itemsPerPage);

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

  const inputStyle = `border text-gray-900 text-sm rounded-sm w-full p-1.5  
     dark:border-gray-300 dark:placeholder-gray-500 outline-none`;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleDelete = (note) => {
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

  const handleUpdate = () => {
    if (!title || !tagline || !note) {
      toast.error("Please enter the value you want to update");
      setNewNote({ ...newNote, title: "", tagline: "", note: "" });
    } else {
      update(ref(db, `/${tempuuid}`), { tempuuid, ...newNote });
      setNewNote({ ...newNote, title: "", tagline: "", note: "" });
      setIsEdit(false);
      toast("Note Updated");
    }
  };

  return (
    <section className="w-full mt-8 h-[60vh]">
      {isEdit && (
        <div className="absolute inset-0 w-[100vw] h-screen bg-gray-300 z-10 bg-opacity-80 flex justify-center items-center">
          <div className="w-[350px] p-5 bg-white rounded">
            <form className="flex flex-col w-full gap-5">
              <input
                type="text"
                className={inputStyle}
                placeholder="Title"
                name="title"
                value={title}
                onChange={handleChange}
              />
              <input
                type="text"
                className={inputStyle}
                placeholder="Tagline"
                name="tagline"
                value={tagline}
                onChange={handleChange}
              />
              <textarea
                type="text"
                className={inputStyle}
                placeholder="Note"
                maxLength={100}
                name="note"
                value={note}
                onChange={handleChange}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="bg-[#8ec09f] hover:bg-green-700 font-medium rounded-sm text-sm py-1.5 text-center px-4 transition-all duration-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-[#8ec09f] hover:bg-green-700 font-medium rounded-sm text-sm py-1.5 text-center px-4 transition-all duration-500"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="w-5/6 mx-auto flex flex-wrap justify-start items-start gap-4 h-full">
        {currentItems?.reverse().map((note) => (
          <div
            className="w-[389px] border-[1px] border-[#8ec09f] rounded border-solid h-[28vh] p-3 pt-7 border-t-[25px] relative shadow-md"
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
            <div className="absolute top-1 right-3 flex gap-1 items-center">
              <div className="">
                <MdDelete
                  size={24}
                  className=" text-[#8ec09f] cursor-pointer"
                  onClick={() => handleDelete(note)}
                />
              </div>
              <div className="">
                <BsPinFill
                  size={24}
                  className="cursor-pointer text-[#8ec09f]"
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
