import {
  useAVToggle,
  useHMSActions,
  useScreenShare,
} from "@100mslive/react-sdk";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

import CallIcon from "@mui/icons-material/Call";

import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { Box, Fab } from "@mui/material";
import { appwrite } from "../../../store/appwrite";
import { useRouter } from "next/router";

type Props = {
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

function Footer({ setShowPreview }: Props) {
  const router = useRouter();
  const { id } = router.query;

  const hmsActions = useHMSActions();

  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();

  const { amIScreenSharing, toggleScreenShare, screenShareVideoTrackId } =
    useScreenShare();

  console.log(screenShareVideoTrackId);

  const leave = () => {
    hmsActions.leave();
    setShowPreview(true);
    router.push(("/dashboard/teams/" + id) as string);
  };

  return (
    <Box className="fixed bottom-0 mb-8 flex flex-row gap-4">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab onClick={toggleAudio} className="text-white hover:text-zinc-800 transition">
          {isLocalAudioEnabled ? (
            <MicIcon />
          ) : (
            <MicOffIcon />
          )}
        </Fab>
        <Fab onClick={toggleVideo} className="text-white hover:text-zinc-800">
          {isLocalVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </Fab>
        <Fab color="error" onClick={leave} aria-label="end">
          <CallIcon />
        </Fab>
      </Box>
      {/* <button
        className="p-4 rounded-full bg-gray-400 text-zinc-700 hover:text-zinc-800 transition"
        onClick={() => toggleScreenShare()}
      >
        {amIScreenSharing ? <ScreenShareIcon /> : <StopScreenShareIcon />}
      </button> */}
    </Box>
  );
}

export default Footer;
