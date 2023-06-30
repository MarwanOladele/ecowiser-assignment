import Navbar from "./components/navbar/Navbar";
import NoteForm from "./components/noteForm/NoteForm";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="">
      <ToastContainer position="top-center"/>
      <Navbar />
      <NoteForm />
    </div>
  );
}

export default App;
