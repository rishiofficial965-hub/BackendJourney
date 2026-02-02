import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full py-4 px-3 flex flex-wrap justify-evenly gap-2">
      {notes.map((note, idx) => {
        return (
          <div
            key={idx}
            className="hover:scale-105 px-5 py-7 bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl basis-[30%] rounded-2xl cursor-pointer duration-100 break-all"
          >
            <h1 className="text-3xl font-bold">{note.title}</h1>
            <p className="text-xl">{note.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
