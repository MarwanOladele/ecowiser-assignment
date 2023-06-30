import { useState } from "react";

const NoteForm = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const inputStyle = `border text-gray-900 text-sm rounded-sm w-full p-1.5  
     dark:border-gray-300 dark:placeholder-gray-500 outline-none`;

  return (
    <section className="w-full mt-5">
      <form className="w-5/6 mx-auto border-[1px] dark:border-gray-400 rounded border-solid flex gap-3 flex-col p-3">
        <div className="flex gap-3">
          <div className="flex basis-1/2 gap-3">
            <div className="basis-1/3">
              <input type="text" placeholder="Title" className={inputStyle} />
            </div>
            <div className="basis-2/3">
              <input type="text" placeholder="Tagline" className={inputStyle} />
            </div>
          </div>
          <div className="basis-1/2">
            <input type="text" placeholder="Note" className={inputStyle} />
          </div>
        </div>
        <div className="">
          <button className="bg-[#8ec09f] hover:bg-green-700 font-medium rounded-sm text-sm py-1.5 text-center px-4 transition-all duration-500">
            Add Note
          </button>
        </div>
      </form>
    </section>
  );
};

export default NoteForm;
