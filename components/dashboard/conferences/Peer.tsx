import { HMSPeer, useHMSActions, useVideo } from "@100mslive/react-sdk";
import { CardMedia, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { appwrite } from "../../../store/appwrite";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";

type PeerProps = {
  peer: HMSPeer;
  screenSharing?: boolean;
  isOwner: boolean;
};

function Peer({ peer, isOwner }: PeerProps) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const hmsActions = useHMSActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const kickUser = () => {
    hmsActions.removePeer(peer.id, "Kicked");
    setAnchorEl(null);
  }

  return (
    <Grid item xs={12}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="bg-zinc-800 w-64 h-48 rounded-md border-2 border-zinc-400"
        style={{
          objectFit: "contain",
          backgroundImage:
            "url(" +
            appwrite.avatars.getInitials(peer.name, 256, 192).href +
            ")",
          backgroundSize: "cover",
        }}
      />
      {isOwner && (
        <div className="absolute -mt-44 ml-52">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={kickUser} disabled={peer.roleName === "owner"}>Kick</MenuItem>
          </Menu>
        </div>
      )}
      <Typography variant="subtitle1">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </Typography>
    </Grid>
  );
}

export default Peer;
