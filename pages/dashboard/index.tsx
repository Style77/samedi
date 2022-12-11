import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/common/Loading";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { appwrite } from "../../store/appwrite";

import { AiOutlinePlus } from "react-icons/ai";
import { ID } from "appwrite";
import Navbar from "../../components/common/Navbar";
import NewTeamCard from "../../components/dashboard/index/NewTeamCard";

export default function Dashboard() {
  useRequireAuth();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Samedi - dashboard</title>
      </Head>
      <main className="min-h-screen">
        <section className="grid grid-cols-4 p-4">
          <NewTeamCard />
        </section>
      </main>
    </>
  );
}
