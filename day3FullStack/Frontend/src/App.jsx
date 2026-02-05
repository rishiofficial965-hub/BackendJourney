import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  //get method
  //using useeffect so it only calls one time
  function fetchh() {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    fetchh();
  }, []);

  function handleSubmmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.error(res.data);
        fetchh();
        e.target.reset();
      })
      .catch((err) => console.error(err));
  }
  function removeNote(idx) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (!shouldDelete) return;
    axios
      .delete(`http://localhost:3000/api/notes/${idx}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    fetchh();
  }

  return (
    <>
      <div className="border-black flex items-center gap-40 border-4 py-5 w-full rounded-2xl">
        <form
          onSubmit={handleSubmmit}
          className="w-[50%] py-4 px-3 flex flex-wrap items-center justify-around gap-2"
          action=""
        >
          <input
            name="title"
            className="border border-white/10 py-4 px-2 rounded-2xl bg-black/40"
            type="text"
            placeholder="Enter title.."
          />
          <input
            name="description"
            className="border border-white/10 py-4 px-2 rounded-2xl bg-black/40"
            type="text"
            placeholder="Enter description.."
          />
          <button className="cursor-pointer border border-white/10  rounded-2xl bg-red-800 py-3 px-7 text-black font-bold active:scale-95 ">
            Create
          </button>
        </form>
        <div>
          <h1 className="ml-10 text-4xl font-extrabold text-black">
            CREATE HERE!!!!!!!!
          </h1>
        </div>
      </div>
      <div className="w-full mt-5 py-4 px-3 flex flex-wrap justify-evenly gap-2">
        {notes.map((note, idx) => {
          return (
            <div
              key={idx}
              className="px-5 py-7 bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl basis-[30%] rounded-2xl cursor-pointer duration-100 break-all relative"
            >
              <button
                onClick={() => {
                  removeNote(note._id);
                }}
                className="absolute top-2 right-3 border border-white/10 rounded-2xl px-2 py-0.5 bg-red-800 text-black active:scale-95 cursor-pointer"
              >
                <p className="text-xs font-bold ">remove</p>
              </button>
              <h1 className="text-3xl font-bold">{note.title}</h1>
              <p className="text-xl">{note.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
