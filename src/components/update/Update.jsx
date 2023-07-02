import { ref, update } from "firebase/database";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const Update = ({ newNote, setNewNote, tempuuid, setIsEdit }) => {
  const { title, tagline, note } = newNote;

  const inputStyle = `border text-gray-900 text-sm rounded-sm w-full p-1.5  
     dark:border-gray-300 dark:placeholder-gray-500 outline-none`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
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
  );
};

export default Update;
