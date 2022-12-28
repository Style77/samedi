import {
  Button,
  Dialog,
  DialogTitle,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Conference } from "../../../pages/dashboard/teams/[id]/conferences/[conferenceId]";

import EditIcon from "@mui/icons-material/Edit";
import { appwrite } from "../../../store/appwrite";

type Props = {
  conference: Conference;
  setConference: (conference: Conference) => void;
};

const EditConferenceModal = ({ conference, setConference }: Props) => {
  const [conferenceName, setConferenceName] = useState(conference?.name);

  const [open, setOpen] = useState(false);

  const updateConference = async () => {
    await appwrite.database.updateDocument(
      process.env.APPWRITE_CONFERENCES_DATABASE_ID!,
      process.env.APPWRITE_CHANNELS_COLLECTION_ID!,
      conference.$id,
      {
        name: conferenceName,
      }
    );
    setConference({ ...conference, name: conferenceName });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit conference</DialogTitle>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
            updateConference();
          }}
        >
          <Stack spacing={2}>
            <TextField
              size="small"
              autoFocus
              required
              onChange={(e) => setConferenceName(e.target.value)}
              value={conferenceName}
              sx={{ paddingInline: "16px" }}
            />
            <Button type="submit">Save</Button>
          </Stack>
        </form>
      </Dialog>
    </>
  );
};

export default EditConferenceModal;
