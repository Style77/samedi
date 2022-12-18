import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/common/Loading";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { appwrite } from "../../store/appwrite";

import { AiOutlinePlus } from "react-icons/ai";
import { ID } from "appwrite";
import NewTeamCard from "../../components/dashboard/index/NewTeamCard";
import NotificationsCard from "../../components/dashboard/index/NotificationsCard";
import TeamsCard from "../../components/dashboard/index/TeamsCard";
import Navbar from "../../components/dashboard/team/index/Navbar";


import { Grid } from "@mui/material";
import PatchNotesCard from "../../components/dashboard/index/PatchNotesCard";

export default function Dashboard() {
  useRequireAuth();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Samedi - dashboard</title>
      </Head>
      <main className="min-h-screen bg-zinc-900">
        <section className="p-12">
          <Grid container spacing={3}>
            <NewTeamCard />
            <TeamsCard />
            <PatchNotesCard />
            <NotificationsCard />
          </Grid>
        </section>
      </main>
    </>
  );
}
