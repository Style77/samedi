import { HMSPeer, useVideo } from "@100mslive/react-sdk";

type PeerProps = {
  peer: HMSPeer;
  screenSharing?: boolean;
};

function Peer({ peer }: PeerProps) {


  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="bg-black w-64 h-48 rounded-md border-2 border-zinc-400"
      />
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
