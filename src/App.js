import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import AddNotes from "./components/addNotes/addNotes";
import "./index.css";
import Container from "@mui/material/Container";
import NotesList from "./components/notesList/notesList";
import DoneList from "./components/doneList/doneList";
import { formatDate } from "./utils/getDateFormat";
import { v4 as uuidv4 } from "uuid";

let today = formatDate(new Date());
const port = 8000;

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(null);
  const [doneNotes, setDoneNotes] = useState(null);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:${port}/data`).then((res) => {
      if (res.status === 200) {
        setNotes(res.data);
      }
    });
  }, [notes]);

  useEffect(() => {
    axios.get(`http://localhost:${port}/doneList`).then((res) => {
      if (res.status === 200) {
        setDoneNotes(res.data);
      }
    });
  }, [doneNotes]);

  const handleEditNote = (e, id) => {
    let currentNote = notes && notes.filter((note) => note.id === id);
    if (!currentNote.length > 0) {
      const newNote = e.target.value;
      setNote(newNote);
      setIsEdited(false);
    } else {
      let editedNote = currentNote[0]?.note
      setNote(editedNote);
      setIsEdited(true);
    }
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    const noteObj = {
      id: uuidv4(),
      name: "NV",
      note,
      date: today,
    };

    if (!isEdited) {
      axios.post(`http://localhost:${port}/data`, noteObj).then((res) => {
        setNote("");
      });
    } else {
      axios
        .put(`http://localhost:${port}/data`, noteObj, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setNote("");
        });
    }
  };

  const handleDeleteNote = (id) => {
    axios.delete(`http://localhost:${port}/data/` + id);
  };

  const deleteDoneNote = (id) => {
    console.log("del",id)
    axios.delete(`http://localhost:${port}/doneList/` + id);
  };

  // move to done
  const handleMoveToDone = (id) => {
    axios.get(`http://localhost:${port}/data/` + id).then((res) => {
      if (res.status === 200) {
        axios
          .post(`http://localhost:${port}/doneList/`, res.data, {
            "Content-Type": "application/json",
          })
          .then((res) => {
            handleDeleteNote(id);
          });
      }
    });
  };

  return (
    <Container maxWidth="md" className="app-container">
      <h1>Reminders</h1>
      <AddNotes
        today={today}
        handleAddNote={handleAddNote}
        handleEditNote={handleEditNote}
        note={note}
        isEdited={isEdited}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <NotesList
            notes={notes}
            handleMoveToDone={handleMoveToDone}
            handleEditNote={handleEditNote}
            handleDeleteNote={handleDeleteNote}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DoneList doneNotes={doneNotes} deleteDoneNote={deleteDoneNote} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

// Also add drag drop feature

// for(let [i, note] of notes.entries()) {
//   if(note.id === id) {
//     setNotes(notes.splice(i, 1))
//   }
// }
