import { CardContent, List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { ID, Query } from "appwrite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { appwrite } from "../../../../../store/appwrite";

type Board = {
  $id: string;
  name: string;
  teamId: string;
  columns: any;
};

const BoardsWidget = () => {
  const router = useRouter();
  const { id } = router.query;

  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const boards = await appwrite.database.listDocuments(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_BOARDS_COLLECTION_ID!,
        [Query.equal("teamId", id as string)]
      );
      console.log(boards)
      setBoards(boards.documents);
    };
    fetchBoards();
  }, [id]);

  const createBoard = async () => {
    const board = await appwrite.database.createDocument(
      process.env.APPWRITE_TEAMS_DATABASE_ID!,
      process.env.APPWRITE_BOARDS_COLLECTION_ID!,
      ID.unique(),
      {
        name: "New Board",
        teamId: id as string,
        columns: [],
      }
    );
    
    router.push(`/dashboard/teams/${id}/boards/${board.$id}`)
  }

  return (
    <Card>
      <CardHeader title="Boards" subheader="List of boards for this Team" />
      <Divider />
      <CardContent>
        <List>
          {boards.map((board) => (
            <Link
              href={`/dashboard/teams/${id}/boards/${board.$id}`}
              key={board.$id}
            >
              <ListItem>
                <ListItemText primary={board.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button variant="outlined" color="inherit" onClick={createBoard}>
          Create New Board
        </Button>
      </CardActions>
    </Card>
  );
};

export default BoardsWidget;
