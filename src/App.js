import Navbar from "./components/navbar/Navbar";
import NoteForm from "./components/noteForm/NoteForm";
import PinNote from "./components/pinned/Notes";
import Note from "./components/unpinned/Note";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="relative">
      <ToastContainer position="top-center" />
      <Navbar />
      <NoteForm />
      <PinNote />
      <Note />
    </div>
  );
}

export default App;
