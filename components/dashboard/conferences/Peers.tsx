import { selectPeers, selectPeersScreenSharing, useHMSStore } from "@100mslive/react-sdk";
import { Box, Grid } from "@mui/material";
import React from "react";
import Peer from "./Peer";

function Peers() {
  const peers = useHMSStore(selectPeers);

  const presenters = useHMSStore(selectPeersScreenSharing);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box>
        <Grid container spacing={2}>
          {peers.map((peer) => (
            <Peer
              key={peer.id}
              peer={peer}
              isOwner={peer.roleName === "owner"}
            />
          ))}

          {presenters.map((peer) => (
            <Peer
              key={`${peer.id}-ss`}
              peer={peer}
              screenSharing={true}
              isOwner={peer.roleName === "owner"}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
export default Peers;
