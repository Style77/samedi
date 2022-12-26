import { Button, Modal, ModalDialog, Stack, TextField, Typography } from "@mui/joy";
import { useState } from "react";
import { Conference } from "../../../pages/dashboard/teams/[id]/conferences/[conferenceId]";

import EditIcon from '@mui/icons-material/Edit';
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Edit conference
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            {conference.name}
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
              updateConference();
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="Name"
                autoFocus
                required
                onChange={(e) => setConferenceName(e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default EditConferenceModal;