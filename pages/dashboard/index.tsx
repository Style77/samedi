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

export default function Dashboard() {
  useRequireAuth();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Samedi - dashboard</title>
      </Head>
      <main className="min-h-screen bg-gray-200">
        <section className="grid grid-cols-3 gap-2 p-4">
          <NewTeamCard />
          <TeamsCard />
          {/* <PatchNotesCard /> */}
          <NotificationsCard />
        </section>
      </main>
    </>
  );
}
