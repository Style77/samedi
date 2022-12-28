import {
  selectBroadcastMessages,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const hmsActions = useHMSActions();
  const messages = useHMSStore(selectBroadcastMessages);

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    hmsActions.sendBroadcastMessage(message);
    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "33.333333%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <Box sx={{ flexDirection: "column" }}>
        <Box sx={{ flexDirection: "row", overflowY: "scroll", height: "70vh" }}>
          {messages.length > 0 ? (messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: 1,
                margin: 1,
                borderRadius: 1,
                backgroundColor: "#e0e0e0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  {message.senderName}
                </Typography>
                <Typography variant="caption">
                  {new Date(message.time).toLocaleTimeString()}
                </Typography>
              </Box>
              <Typography variant="body2">{message.message}</Typography>
            </Box>
          ))) : (
            <Typography variant="body2">No messages yet</Typography>
          )}
        </Box>
        <Box>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            size="small"
          />
          <Button endIcon={<SendIcon />} onClick={sendMessage} sx={{ ml: 2 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
