import { Models } from "appwrite";
import Link from "next/link";
import { useEffect, useState } from "react";
import { appwrite } from "../../../store/appwrite";

const TeamsCard = () => {
  const [teams, setTeams] = useState<Models.Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teams = await appwrite.teams.list();
      setTeams(teams.teams);
    };
    fetchTeams();
  }, []);

  return (
    <div className="border-2 border-black p-4 rounded-md bg-white flex flex-col">
      <div className="flex flex-row justify-between border-b-2 border-black">
        <h1 className="text-2xl font-semibold">Teams</h1>
      </div>
      <div className="teams">
        <ul>
          {teams.map((team: any) => (
            <Link
              href="/dashboard/teams/[id]"
              as={`/dashboard/teams/${team.$id}`}
              key={team.$id}
            >
              <li
                key={team.$id}
                className="text-blue-400 hover:text-blue-500 transition"
              >
                {team.name} ({team.total} members)
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamsCard;
