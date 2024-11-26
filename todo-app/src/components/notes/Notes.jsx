import React, { useEffect, useState } from "react";
import sharedStyles from "../../assets/inputStyles.module.css";
import pageStyles from "./Notes.module.css";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [noteValue, setNoteValue] = useState("");
    const [isNoteEmpty, setIsNoteEmpty] = useState(false);

    useEffect(() => {
        setNotes(JSON.parse(localStorage.getItem("notes")) || []);
    }, []);

    const handleChange = (event) => {
        setNoteValue(event.target.value);
    };

    const handleSave = () => {
        if (noteValue.length === 0) {
            setIsNoteEmpty(true);
            return;
        }

        const currentDate = new Date();
        const date = `${currentDate.getDate().toString().padStart(2, "0")}.${(
            currentDate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}.${currentDate
            .getFullYear()
            .toString()
            .slice(-2)} --- ${currentDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${currentDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

        setNotes([{ content: noteValue, date: date }, ...notes]);
        localStorage.setItem(
            "notes",
            JSON.stringify([{ content: noteValue, date: date }, ...notes])
        );

        setIsNoteEmpty(false);
        setNoteValue("");
    };

    const handleNoteDelete = (index) => {
        const filteredNotes = notes.filter((_, id) => id !== index);
        setNotes(filteredNotes);
        localStorage.setItem("notes", JSON.stringify(filteredNotes));
    };

    return (
        <div className={sharedStyles.container}>
            <div className={sharedStyles.saveContainer}>
                <input
                    className={`${sharedStyles.inputText} ${
                        isNoteEmpty
                            ? sharedStyles.emptyInput
                            : sharedStyles.inputText
                    }`}
                    type="text"
                    placeholder="Enter what is in your mind"
                    onChange={handleChange}
                    value={noteValue}
                />
                <button className={sharedStyles.button} onClick={handleSave}>
                    Save note
                </button>
            </div>
            <h1 className={sharedStyles.h1}>Your notes</h1>
            <div className={pageStyles.notesListContainer}>
                {notes.length > 0 ? (
                    notes.map((note, index) => {
                        return (
                            <div
                                key={index}
                                className={pageStyles.noteItemContainer}
                            >
                                <div className={pageStyles.noteItemInfo}>
                                    <h2 className={pageStyles.noteDate}>
                                        {note.date}
                                    </h2>
                                    <hr className={pageStyles.noteHr} />
                                    <p className={pageStyles.noteContent}>
                                        {note.content}
                                    </p>
                                </div>
                                <button className={`${sharedStyles.button} ${pageStyles.noteItemButton}`} onClick={() => handleNoteDelete(index)}>
                                    Delete note
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className={sharedStyles.emptyArray}>No notes yet!</p>
                )}
            </div>
        </div>
    );
};

export default Notes;
