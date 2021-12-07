import React from "react";
import { Box, TextField } from "@mui/material";

const AddNotes = (props) => {

  const {note, isEdited, handleAddNote, handleEditNote} = props

  return (
    <Box
      className="notes-editor"
      component="form"
      sx={{
        maxWidth: "100%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleAddNote}
    >
      <TextField
        fullWidth
        id="add-note"
        label="Add notes here..."
        value={note}
        // defaultValue={note}
        onChange={(e) => handleEditNote(e)}
      />
    </Box>
  );
};

export default AddNotes;

// module.exports = [{ id: 1, name: "NV", note: "Go to market" }];
// to run json server npx json-server --watch data/notes.json --port=8000


// const handleAddNote = (event, note) => {
  //   event.preventDefault();
  //   if (note !== "") {
  //     const noteObj = {
  //       id: uuidv4(),
  //       name: "NV",
  //       note,
  //       date: today
  //     };
  //     axios.post("http://localhost:8999/data", noteObj).then((res) => {
  //       setNote("")
  //     })    
  //   }
  // };


