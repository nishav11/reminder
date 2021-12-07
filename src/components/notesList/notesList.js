import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemIcon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import "./noteList.css";

const styles = {
  listItem_icons: {
    margin: "0 10px",
    cursor: "pointer",
  },
};

const NotesList = (props) => {
  const {notes, handleMoveToDone, handleDeleteNote, handleEditNote} = props;

  return (
    <List className="note-list_wrapper">
      <h3>To Do</h3>
      {notes &&
        notes.map((note) => {
          return (
            <Paper elevation={3} maxWidth="sm">
              <ListItem>
                <ListItemText primary={note.note} secondary={`${note.date}`} />
                <ListItemIcon>
                  <EditIcon color="primary" style={styles.listItem_icons} onClick={(e) => handleEditNote(e, note.id)}/>
                  <DoneIcon
                    color="success"
                    style={styles.listItem_icons}
                    onClick={() => handleMoveToDone(note.id)}
                  />
                  <DeleteIcon
                    color="error"
                    style={styles.listItem_icons}
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </Paper>
          );
        })}
    </List>
  );
};

export default NotesList;
