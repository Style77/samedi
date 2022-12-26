import { Button } from "@mui/material";
import { Query } from "appwrite";
import Head from "next/head";
import { useRouter } from "next/router";
import { Models } from "node-appwrite";
import { useEffect, useRef, useState } from "react";
import EditConferenceModal from "../../../../../components/dashboard/conferences/EditConferenceModal";
import Navbar from "../../../../../components/dashboard/team/index/Navbar";
import { useRequireAuth } from "../../../../../hooks/useRequireAuth";
import { appwrite } from "../../../../../store/appwrite";

import io from "socket.io-client";
import Peer from "simple-peer";

var jwt = require("jsonwebtoken");
var uuid4 = require("uuid4");

import {
  HMSRoomProvider,
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Peers from "../../../../../components/dashboard/conferences/Peers";
import Footer from "../../../../../components/dashboard/conferences/Footer";

export type Conference = {
  $id: string;
  name: string;
  teamId: string;
  ended: Date | null;
};

export default function Conference() {
  useRequireAuth();

  const router = useRouter();
  const { id, conferenceId } = router.query;

  const [userId, setUserId] = useState<string | null>(null);

  const [isOwner, setIsOwner] = useState(false);
  const [team, setTeam] = useState<Models.Team | null>(null);

  const [conference, setConference] = useState<Conference | null>(null);

  const hmsActions = useHMSActions();

  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(() => {
    const getConference = async () => {
      let conference = await appwrite.database.getDocument(
        process.env.APPWRITE_CONFERENCES_DATABASE_ID!,
        process.env.APPWRITE_CHANNELS_COLLECTION_ID!,
        conferenceId as string
      );
      console.log(conference);
      setConference({
        $id: conference["$id"],
        name: conference["name"],
        teamId: conference["teamId"],
        ended: conference["ended"],
      });
    };

    const getUserId = async () => {
      let user = await appwrite.account.get();
      setUserId(user.$id);
    };

    const checkIfOwner = async () => {
      let memberships = await appwrite.teams.listMemberships(id as string, [
        Query.equal("userId", (await appwrite.account.get()).$id),
      ]);
      console.log(memberships);

      if (memberships.memberships[0].roles.includes("owner")) {
        setIsOwner(true);
      }
    };

    const getCurrentTeam = async () => {
      let team = await appwrite.teams.get(id as string);
      setTeam(team);
    };

    getCurrentTeam();
    checkIfOwner();
    getConference();
    getUserId();
  }, [conferenceId, id]);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  useEffect(() => {
    const joinRoom = async () => {
        
        let res = await fetch(`${process.env.SAMEDI_TOKEN_ENDPOINT!}api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room_id: conferenceId,
            role: "member",
            user_id: userId,
          }),
        });

        let data = await res.json();
        console.log(data)

        hmsActions.join({
          userName: (await appwrite.account.get()).name,
          authToken: data.token,
          settings: {
            isAudioMuted: true,
            isVideoMuted: true,
          }
        });
    }

    joinRoom();
  }, [conferenceId, hmsActions, userId]);

  return (
    <>
      <Head>
        <title>Samedi - dashboard</title>
      </Head>
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <div className="flex flex-row mt-2">
          <h1 className="text-2xl flex">{conference?.name}</h1>
          {isOwner && (
            <div className="flex flex-row gap-2">
              <EditConferenceModal
                conference={conference!}
                setConference={setConference}
              />
            </div>
          )}
        </div>
        {isConnected ? (
          <>
            <Peers />
            <Footer />
          </>
        ) : (
          <h1>Connecting...</h1>
        )}
      </main>
    </>
  );
}
