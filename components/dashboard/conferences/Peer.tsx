import { HMSPeer, useVideo } from "@100mslive/react-sdk";
import { appwrite } from "../../../store/appwrite";

type PeerProps = {
  peer: HMSPeer;
  screenSharing?: boolean;
};

function Peer({ peer }: PeerProps) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  console.log(videoRef);

  return (
    <div className="peer-container">
      {videoRef ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="bg-zinc-800 w-64 h-48 rounded-md border-2 border-zinc-400"
          style={{ objectFit: "contain", backgroundImage: "url(" + appwrite.avatars.getInitials(peer.name, 256, 192).href + ")", backgroundSize: "cover"}}
        />
      ) : (
        <div className="bg-gray-700 w-64 h-48 rounded-md border-2 border-zinc-400" />
      )}
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
