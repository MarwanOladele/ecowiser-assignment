import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { uid } from "uid";
import { ref, set } from "firebase/database";

const NoteForm = () => {
  const [newNote, setNewNote] = useState({
    title: "",
    tagline: "",
    note: "",
    pinned: false,
  });

  const { title, tagline, note } = newNote;

  const inputStyle = `border text-gray-900 text-sm rounded-sm w-full p-1.5  
     dark:border-gray-300 dark:placeholder-gray-500 outline-none`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };
  const addNote = async (e) => {
    e.preventDefault();
    if (!title || !tagline || !note) {
      toast.error("Please enter a value in the input fields");
      setNewNote({ ...newNote, title: "", tagline: "", note: "" });
    } else {
      try {
        const uuid = Date.now();
        await set(ref(db, `${uuid}`), { uuid, ...newNote });
        toast("Note Added");
        setNewNote({ ...newNote, title: "", tagline: "", note: "" });
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <section className="w-full mt-5">
      <form className="w-5/6 mx-auto border-[1px] dark:border-gray-400 rounded border-solid flex gap-3 flex-col p-3">
        <div className="flex gap-3">
          <div className="flex basis-1/2 gap-3">
            <div className="basis-1/3">
              <input
                type="text"
                placeholder="Title"
                className={inputStyle}
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="basis-2/3">
              <input
                type="text"
                placeholder="Tagline"
                className={inputStyle}
                name="tagline"
                value={tagline}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="basis-1/2">
            <input
              type="text"
              placeholder="Note"
              className={inputStyle}
              name="note"
              value={note}
              onChange={handleChange}
              maxLength={100}
            />
          </div>
        </div>
        <div className="">
          <button
            onClick={addNote}
            className="bg-[#8ec09f] hover:bg-green-700 font-medium rounded-sm text-sm py-1.5 text-center px-4 transition-all duration-500"
          >
            Add Note
          </button>
        </div>
      </form>
    </section>
  );
};

export default NoteForm;
