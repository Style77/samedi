import { useAVToggle, useHMSActions, useScreenShare } from "@100mslive/react-sdk";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

import CallIcon from "@mui/icons-material/Call";

import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { Fab } from "@mui/material";
import { appwrite } from "../../../store/appwrite";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter()
  const { id } = router.query;

  const hmsActions = useHMSActions();

  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();

  const { amIScreenSharing, toggleScreenShare, screenShareVideoTrackId } =
    useScreenShare();

  console.log(screenShareVideoTrackId);

  const leave = () => {
    hmsActions.leave();
    router.push("/dashboard/teams/" + id as string);
  }

  return (
    <div className="fixed bottom-0 mb-8 flex flex-row gap-4">
      <Fab onClick={toggleAudio}>
        {isLocalAudioEnabled ? (
          <MicIcon className="text-zinc-800" />
        ) : (
          <MicOffIcon className="" />
        )}
      </Fab>
      <Fab onClick={toggleVideo}>
        {isLocalVideoEnabled ? (
          <VideocamIcon className="text-zinc-800" />
        ) : (
          <VideocamOffIcon />
        )}
      </Fab>
      <Fab color="error" onClick={leave} aria-label="end">
        <CallIcon />
      </Fab>
      {/* <button
        className="p-4 rounded-full bg-gray-400 text-zinc-700 hover:text-zinc-800 transition"
        onClick={() => toggleScreenShare()}
      >
        {amIScreenSharing ? <ScreenShareIcon /> : <StopScreenShareIcon />}
      </button> */}
    </div>
  );
}

export default Footer;
