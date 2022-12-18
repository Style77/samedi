import { appwrite } from "../../../../store/appwrite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Models, Query } from "appwrite";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { id } = router.query;

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

  const [user, setUser] = useState<Models.Account<Models.Preferences> | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const team = await appwrite.teams.get(id as string);
      setTeamName(team.name);
    };
    const fetchAvatar = async () => {
        const user = await appwrite.account.get();
        const avatarUrl = appwrite.avatars.getInitials(user?.name || "Unnamed", 48, 48);
        setAvatarUrl(avatarUrl.href);
    }
    const fetchUser = async () => {
        const user = await appwrite.account.get();
        setUser(user);
    }
    const fetchRoles = async () => {
      const user = await appwrite.account.get();
      const membership = await appwrite.teams.listMemberships(id as string, [
        Query.equal("userId", user.$id),
      ]);
      setRoles(membership.memberships[0].roles);
    };

    fetchUser();
    fetchTeam();
    fetchAvatar();
    fetchRoles();
  }, [id]);

  return (
    <nav className="w-screen p-4 border-b-2 border-black">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <h1 className="text-2xl font-bold ml-2">{teamName}</h1>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-col">
            <span className="font-semibold">{user?.name || "Unknown"}</span>
            <span className="text-gray-400">{roles[0]?.charAt(0).toUpperCase() + roles[0]?.slice(1)}</span>
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
