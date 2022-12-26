import { Card, CardContent, CardHeader, Divider, IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import { Box } from "@mui/system";
import CardActions from "@mui/material/CardActions";

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
    <Card style={{ height: "100%" }} className="select-none">
      <CardHeader title="Notes" />
      <Divider />
      <CardContent style={{ overflow: "auto", maxHeight: "350px" }}>
        <List>
          {notes.map((note, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeNote(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={note} />
            </ListItem>
          ))}
        </List>

        <CardActions
          style={{ position: "absolute", bottom: "0px", background: "white", borderTop: "1px solid #e0e0e0" }}
        >
          <TextField
            id="newNote"
            placeholder="Write note"
            variant="outlined"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            required
          />
          <Fab onClick={addNote} style={{ marginLeft: "10px" }}>
            <FaPlus />
          </Fab>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default NotesWidget;
