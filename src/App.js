import Navbar from "./components/navbar/Navbar";
import Note from "./components/note/Note";
import NoteForm from "./components/noteForm/NoteForm";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="relative">
      <ToastContainer position="top-center"/>
      <Navbar />
      <NoteForm />
      <Note/>
    </div>
  );
}

export default App;
