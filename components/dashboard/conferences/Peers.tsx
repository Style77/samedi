import { selectPeers, selectPeersScreenSharing, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

function Peers() {
  const peers = useHMSStore(selectPeers);

  const presenters = useHMSStore(selectPeersScreenSharing);

  return (
    <div className="">
      <div className="">
        <div className="grid grid-flow-col gap-2">

          {peers.map((peer) => (
            <Peer key={peer.id} peer={peer} />
          ))}

          {presenters.map((peer) => (
            <Peer key={`${peer.id}-ss`} peer={peer} screenSharing={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Peers;
