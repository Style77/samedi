import { ID, Permission, Role } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { appwrite } from "../../../store/appwrite";

const maxTeamsCount = 3;

const defaultLayout = [{ i: "a", x: 0, y: 0, w: 1, h: 1}, { i: "b", x: 1, y: 0, w: 1, h: 1}, { i: "c", x: 2, y: 0, w: 1, h: 1}, { i: "d", x: 3, y: 0, w: 1, h: 1}, { i: "e", x: 4, y: 0, w: 1, h: 1}, { i: "f", x: 5, y: 0, w: 1, h: 1}, { i: "g", x: 6, y: 0, w: 1, h: 1}, { i: "h", x: 7, y: 0, w: 1, h: 1}, { i: "i", x: 8, y: 0, w: 1, h: 1}, { i: "j", x: 9, y: 0, w: 1, h: 1}, { i: "k", x: 10, y: 0, w: 1, h: 1}, { i: "l", x: 11, y: 0, w: 1, h: 1}];

const NewTeamCard = () => {
  const teamNameRef = useRef<HTMLInputElement>(null);

  const [teamStatus, setTeamStatus] = useState("");
  const [teamError, setTeamError] = useState("");

  const [teamsLength, setTeamsLength] = useState(0);

  const createTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const teamName = e.currentTarget.teamName.value;
    const team = await appwrite.teams.create(ID.unique(), teamName);
    if (team.$id) {
      await appwrite.database.createDocument(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_LAYOUTS_COLLECTION_ID!,
        ID.unique(),
        {
          teamId: team.$id,
          tiles: defaultLayout.map((tile) => {return JSON.stringify(tile)}),
        },
        [
          Permission.read(Role.team(team.$id)),
          Permission.update(Role.team(team.$id, "owner")),
        ]
      );

      setTeamStatus("Team created successfully");
    } else {
      setTeamError("Team creation failed");
    }
    teamNameRef.current!.value = "";
  };

  useEffect(() => {
    const fetchUserTeams = async () => {
      const res = await appwrite.teams.list();
      setTeamsLength(res.total); // teams.length
    };
    fetchUserTeams();
  }, [])
  

  return (
    <div
      className="border-2 border-black p-4 rounded-md bg-white flex flex-col"
      id="newTeam"
    >
      <div className="flex flex-row justify-between border-b-2 border-black">
        <h1 className="text-2xl font-semibold">New Team {teamsLength}/{maxTeamsCount}</h1>
        <h2 className="text-green-500">{teamStatus}</h2>
        <h2 className="text-red-500">{teamError}</h2>
      </div>
      <form className="flex flex-col gap-2" onSubmit={createTeam}>
        <div className="flex flex-row justify-between mt-2">
          <input
            type="text"
            name="teamName"
            id="teamName"
            placeholder="Enter team name"
            className="border-2 border-black rounded-md flex px-2"
            maxLength={20}
            ref={teamNameRef}
          />
          <button className="text-gray-400 bg-white hover:text-gray-900 transition font-semibold border-2 border-black rounded-full py-2.5 px-2.5 text-2xl flex flex-row items-center">
            <AiOutlinePlus />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTeamCard;
