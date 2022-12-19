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

import { Grid } from "@mui/material";
import PatchNotesCard from "../../components/dashboard/index/PatchNotesCard";
import Navbar from "../../components/common/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Dashboard() {
  useRequireAuth();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Samedi - dashboard</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="p-12">
          <Grid container spacing={3} style={{marginTop: "12px"}}>
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


export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
}
