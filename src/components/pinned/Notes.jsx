import { onValue, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Pagination from "../pagination/Pagination";
import { MdDelete } from "react-icons/md";
import { BsPinFill, BsPin } from "react-icons/bs";
import { toast } from "react-toastify";
import Update from "../update/Update";

const PinNote = () => {
  const [notes, setNotes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    tagline: "",
    note: "",
    pinned: true,
  });
  const [tempuuid, setTempuuid] = useState("");

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

  const setPin = (id) => {
    notes.map((note) => {
      if (note.uuid === id) {
        note.pinned = !note.pinned;
      }

      return update(ref(db, `${note.uuid}`), { ...note });
    });
  };

  return (
    <section className="w-full mt-8">
      {isEdit && (
        <Update
          newNote={newNote}
          setNewNote={setNewNote}
          tempuuid={tempuuid}
          setIsEdit={setIsEdit}
        />
      )}
      <div className="w-5/6 mx-auto flex flex-wrap justify-start items-start gap-4 h-full">
        {notes?.reverse().map(
          (note) =>
            note.pinned === true && (
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
                  <div className="" onClick={() => setPin(note.uuid)}>
                    {note.pinned ? (
                      <BsPinFill
                        size={24}
                        className="cursor-pointer text-[#8ec09f] z-11"
                      />
                    ) : (
                      <BsPin
                        size={24}
                        className="cursor-pointer text-[#8ec09f] z-11"
                      />
                    )}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default PinNote;
