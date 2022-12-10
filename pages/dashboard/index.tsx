import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/common/Loading";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { appwrite } from "../../store/appwrite";

import { AiOutlinePlus } from "react-icons/ai";
import { ID } from "appwrite";

export default function Dashboard() {
  useRequireAuth();

  const teamNameRef = useRef<HTMLInputElement>(null);

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const [teamStatus, setTeamStatus] = useState("");
  const [teamError, setTeamError] = useState("");

  const createTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teamName = e.currentTarget.teamName.value;
    const team = await appwrite.teams.create(ID.unique(), teamName);
    if (team.$id) {
      setTeamStatus("Team created successfully");
    } else {
      setTeamError("Team creation failed");
    }
    teamNameRef.current!.value = "";
  };

  return (
    <>
      <Head>
        <title>Samedi - dashboard</title>
      </Head>
      <main className="min-h-screen">
        <section className="grid grid-cols-4 p-4">
          <div
            className="border-2 border-gray-400/50 p-4 rounded-md bg-gray-200/50 flex flex-col"
            id="newTeam"
          >
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold">New Team</h1>
              <h2 className="text-green-500">{teamStatus}</h2>
              <h2 className="text-red-500">{teamError}</h2>
            </div>
            <form
              className="flex flex-col gap-2 border-t-2 border-gray-400"
              onSubmit={createTeam}
            >
              <label htmlFor="teamName">Team Name</label>
              <div className="flex flex-row justify-between">
                <input
                  type="text"
                  name="teamName"
                  id="teamName"
                  placeholder="Enter team name"
                  className="border-2 border-gray-400 rounded-md flex w-2/3 pl-2"
                  maxLength={20}
                  ref={teamNameRef}
                />
                <button className="text-gray-400 bg-white hover:text-gray-900 transition font-semibold border-2 border-gray-600 rounded-full py-2.5 px-2.5 text-2xl flex flex-row items-center">
                  <AiOutlinePlus />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
