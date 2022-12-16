import { appwrite } from "../../../../store/appwrite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { Models } from "appwrite";

type Props = {
  teamId: string;
};

const Navbar = ({ teamId }: Props) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

    const [user, setUser] = useState<Models.Account<Models.Preferences> | null>(null);

  const { getCurrentUser } = useAuth();

  useEffect(() => {
    const fetchTeam = async () => {
      const team = await appwrite.teams.get(teamId);
      setTeamName(team.name);
    };
    const fetchAvatar = async () => {
        const user = await getCurrentUser();
        const avatarUrl = appwrite.avatars.getInitials(user?.name || "Unnamed", 48, 48);
        console.log(avatarUrl);
        setAvatarUrl(avatarUrl.href);
    }
    const fetchUser = async () => {
        const user = await getCurrentUser();
        setUser(user);
    }

    fetchUser();
    fetchTeam();
    fetchAvatar();
  }, []);

  return (
    <nav className="w-screen p-4 border-b-2 border-black">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <h1 className="text-2xl font-bold ml-2">Samedi</h1>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-col">
            <span className="font-semibold">{user?.name || "Unknown"}</span>
            <span className="text-gray-400">{teamName}</span>
          </div>
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
