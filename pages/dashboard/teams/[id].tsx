import { Query } from "appwrite";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import GridLayout, { Tile } from "../../../components/dashboard/team/index/GridLayout";
import Navbar from "../../../components/dashboard/team/index/Navbar";
import { useAuth } from "../../../hooks/useAuth";
import { appwrite } from "../../../store/appwrite";

export default function Dashboard() {
  const router = useRouter()
  const { id } = router.query

  const [isEditable, setIsEditable] = useState(false);

  const [roles, setRoles] = useState<string[]>([]);

  const { getCurrentUser } = useAuth();

  const [layouts, setLayouts] = useState<{ lg: Tile[] }>({ lg: [] });
  const [layoutDocId, setLayoutDocId] = useState<string>("");

  useEffect(() => {
    const fetchLayout = async () => {
      const layouts = await appwrite.database.listDocuments(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_LAYOUTS_COLLECTION_ID!,
        [Query.equal("teamId", id as string)]
      );
      console.log(layouts);
      const layoutDocId = layouts.documents[0].$id;
      setLayoutDocId(layoutDocId);
      const layout = await appwrite.database.getDocument(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_LAYOUTS_COLLECTION_ID!,
        layoutDocId
      );

      let tiles: Tile[] = layout.tiles.map((tile: string) => {
        return JSON.parse(tile);
      });

      console.log(tiles);

      setLayouts({ lg: tiles });
    };
    fetchLayout();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      const user = await getCurrentUser()!
      const membership = await appwrite.teams.listMemberships(id as string, [Query.equal("userId", user.$id)]);
      setRoles(membership.memberships[0].roles);
    }
    fetchRoles()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  

  if (!id) return <>Not allowed.</>

  const handleSave = async () => {
    return appwrite.database.updateDocument(
      process.env.APPWRITE_TEAMS_DATABASE_ID!,
      process.env.APPWRITE_LAYOUTS_COLLECTION_ID!,
      layoutDocId,
      {
        tiles: layouts.lg.map((tile) => {return JSON.stringify(tile)})
      }
    );
  }

  const handleEdit = () => {
    if (isEditable) {
      handleSave().then((res) => {
        console.log(res)
        setIsEditable(!isEditable);
      });
    } else {
      setIsEditable(!isEditable);
    }
  };

    return (
      <>
        <Head>
          <title>Samedi - dashboard</title>
        </Head>
        <Navbar teamId={id as string} />
        <main>
          <GridLayout
            teamId={id as string}
            isEditable={isEditable}
            setIsEditable={setIsEditable}

            layouts={layouts}
            setLayouts={setLayouts}
          />
          {roles?.includes("owner") ? (
            <button
              onClick={handleEdit}
              className="bg-black text-white p-2 rounded-md text-2xl fixed bottom-4 right-4"
            >
              {isEditable ? <IoMdCheckmark /> : <AiOutlineEdit />}
            </button>
          ) : null}
        </main>
      </>
    );
}