import { useState } from "react";
import "./App.css";

export default function App() {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [array, setarray] = useState(() => {
    const stored = localStorage.getItem("array");
    return stored ? JSON.parse(stored) : [];
  });

  const writing = (e) => {
    e.preventDefault();

    const arr = [...array];
    arr.push({ title, content });
    setarray(arr);

    localStorage.setItem("array", JSON.stringify(arr));

    settitle("");
    setcontent("");
  };

  function handleDelete(idx) {
    const updated = array.filter((_, i) => i !== idx);
    setarray(updated);
    localStorage.setItem("array", JSON.stringify(updated));
  }

  return (
    <>
      <header className="site-header">
        <h1>THE TROY</h1>
        <p>.</p>
      </header>

      <main className="app-layout">
        <section className="compose">
          <h2>New note</h2>

          {/* title */}
          <form
            id="noteForm"
            onSubmit={(e) => {
              writing(e);
            }}
          >
            <div className="field">
              <label htmlFor="noteTitle">Title</label>
              <input
                type="text"
                id="noteTitle"
                name="noteTitle"
                placeholder="Give it a short title"
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
            </div>

            {/* content */}
            <div className="field">
              <label htmlFor="noteContent">Content</label>
              <textarea
                id="noteContent"
                name="noteContent"
                placeholder="Write your note here"
                value={content}
                onChange={(e) => {
                  setcontent(e.target.value);
                }}
              ></textarea>
            </div>

            <button type="submit" className="add-btn" id="addNoteBtn">
              Add note
            </button>
          </form>
        </section>
        {/* Notes list */}
        <section className="notes-section">
          <h2>Your notes</h2>

          {/* Predefined container: map your notes state into note-cards here */}
          <div id="notesContainer">
            {array.map(function (elem, idx) {
              return (
                <article className="note-card" key={idx}>
                  <div className="note-card-top">
                    <h3>{elem.title || "Choose your title"}</h3>
                    <button
                      className="note-remove"
                      aria-label="Delete note"
                      onClick={() => handleDelete(idx)}
                    >
                      ×
                    </button>
                  </div>

                  <p>{elem.content || "Choose your content"}</p>
                  <span className="note-meta">Today</span>
                </article>
              );
            })}
          </div>

          {/* Show this when your notes array is empty */}
          {array.length === 0 && (
            <div className="empty-state">
              No notes yet. Write your first one on the left.
            </div>
          )}
        </section>
      </main>
    </>
  );
}