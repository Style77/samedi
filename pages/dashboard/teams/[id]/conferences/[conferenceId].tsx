import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
  selectPeers,
  selectRemotePeers,
  useHMSActions,
  useHMSStore,
  usePreviewJoin,
} from "@100mslive/react-sdk";
import Peers from "../../../../../components/dashboard/conferences/Peers";
import Footer from "../../../../../components/dashboard/conferences/Footer";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import Chat from "../../../../../components/dashboard/conferences/chat/Chat";

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

  const [showPreview, setShowPreview] = useState(true);

  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const [userPreviewImage, setUserPreviewImage] = useState<string>("");

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

    const getUserAvatar = async () => {
      let user = await appwrite.account.get();
      const url = appwrite.avatars.getInitials(user.name);
      setUserPreviewImage(url.href);
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

    getUserAvatar();
    getCurrentTeam();
    checkIfOwner();
    getConference();
    getUserId();
  }, [conferenceId, id]);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
        setShowPreview(true);
      }
    };
  }, [hmsActions, isConnected]);

  useEffect(() => {
    const joinRoom = async () => {
      const role = isOwner ? "owner" : "member";

      let res = await fetch(`${process.env.SAMEDI_TOKEN_ENDPOINT!}api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_id: conferenceId,
          role: role,
          user_id: userId,
        }),
      });

      let data = await res.json();
      console.log(data);

      hmsActions.join({
        userName: (await appwrite.account.get()).name,
        authToken: data.token,
        settings: {
          isAudioMuted: isAudioMuted,
          isVideoMuted: isVideoMuted,
        },
      });
    };

    if (!showPreview) {
      joinRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conferenceId, hmsActions, userId, showPreview]);

  return (
    <>
      <Head>
        <title>Samedi - dashboard</title>
      </Head>
      <Navbar />

      {showPreview ? (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] flex-1 px-20 text-center">
          <Box className="flex flex-col rounded-md border-2 p-4 my-2 gap-2">
            <Box className="w-full justify-center items-center flex">
              <Typography className="text-2xl flex">
                {conference ? (
                  conference.name
                ) : (
                  <Skeleton width={200} variant="text" />
                )}
              </Typography>
              {isOwner && (
                <Box sx={{ display: "flex", flexDirection: "row", gap: "2" }}>
                  <EditConferenceModal
                    conference={conference!}
                    setConference={setConference}
                  />
                </Box>
              )}
            </Box>
            <div className="w-full flex flex-row gap-2">
              <Paper variant="outlined" sx={{ height: "24rem", width: "36rem", display: "flex", flexDirection: "column" }}>
                <div className="flex justify-center items-center w-full h-full">
                  <div
                    className="rounded-full w-32 h-32 flex bg-cover bg-center m-auto"
                    style={{ backgroundImage: "url(" + userPreviewImage + ")" }}
                  />
                </div>
                <div className="flex w-full items-end justify-center mb-4 gap-4">
                  <Fab onClick={() => setIsAudioMuted(!isAudioMuted)}>
                    {isAudioMuted ? (
                      <MicOffIcon className="text-white" />
                    ) : (
                      <MicIcon className="text-white" />
                    )}
                  </Fab>
                  <Fab onClick={() => setIsVideoMuted(!isVideoMuted)}>
                    {isVideoMuted ? (
                      <VideocamOffIcon className="text-white" />
                    ) : (
                      <VideocamIcon className="text-white" />
                    )}
                  </Fab>
                </div>
              </Paper>
              <div className="flex flex-col gap-2 w-1/2">
                <div className="flex flex-row gap-2">
                  <button
                    className="flex flex-row gap-2 items-center justify-center w-full rounded-md bg-gray-700 p-2 hover:bg-gray-600 transition"
                    onClick={() => {
                      setShowPreview(false);
                    }}
                  >
                    <div className="flex">
                      <h1 className="text-lg">Join</h1>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </main>
      ) : (
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <Box
            sx={{ display: "flex", flexDirection: "row", marginTop: "0.5rem" }}
          >
            {isConnected ? (
              <>
                <Typography variant="h5">{conference?.name}</Typography>
                {isOwner && (
                  <EditConferenceModal
                    conference={conference!}
                    setConference={setConference}
                  />
                )}
              </>
            ) : (
              <Skeleton variant="text" width={200} />
            )}
          </Box>
          {isConnected ? (
            <>
              <Box sx={{ width: "100vw", paddingInline: "20px" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Peers />
                  <Chat />
                </Box>
              </Box>
              <Footer setShowPreview={setShowPreview} />
            </>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item>
                  <Skeleton variant="rounded" width={256} height={192} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rounded" width={256} height={192} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rounded" width={256} height={192} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rounded" width={256} height={192} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rounded" width={256} height={192} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rounded" width={256} height={192} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rounded" width={256} height={192} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rounded" width={256} height={192} />
                </Grid>
              </Grid>
            </>
          )}
        </main>
      )}
    </>
  );
}
