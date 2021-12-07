import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemIcon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DoneList = ({ doneNotes, deleteDoneNote }) => {
  return (
    <List className="note-list_wrapper">
      <h3>Done</h3>
      {doneNotes &&
        doneNotes.map((note) => {
          return (
            <Paper elevation={3} maxWidth="sm" key={note.id}>
              <ListItem>
                <ListItemText primary={note.note} secondary={`${note.date}`} />
                <ListItemIcon>
                  <DeleteIcon
                    color="error"
                    onClick={() => deleteDoneNote(note.id)}
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

export default DoneList;
