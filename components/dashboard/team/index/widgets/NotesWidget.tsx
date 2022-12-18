import { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";

const NotesWidget = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>("");

  useEffect(() => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      setNotes(JSON.parse(notes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote) {
      return;
    }
    setNotes([...notes, newNote]);
    setNewNote("");
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col border-2 p-4 border-gray-800 bg-gray-300 w-full h-full select-none">
      <h1 className="font-bold">Notes</h1>
      <div className="flex flex-col max-h-1/12 overflow-y-scroll">
        {notes.map((note, index) => (
          <div key={index} className="border-2 border-white p-2 mb-2">
            <div className="flex justify-between">
              <div>{note}</div>
              <div className="cursor-pointer" onClick={() => removeNote(index)}>
                X
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row w-full gap-2 mt-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="border-2 p-2 mb-2 flex rounded-md border-gray-600 w-4/5"
        />
        <button
          className="border-2 border-white text-gray-800 p-3 mb-2 rounded-full justify-center items-center flex"
          onClick={addNote}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default NotesWidget;
