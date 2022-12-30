import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Button,
} from "@mui/material";
import { ID } from "appwrite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { WhiteBoard } from "../../../../../helpers/WhiteBoard";
import { appwrite } from "../../../../../store/appwrite";

const WhiteBoardWidget = () => {
    const router = useRouter();

    const { id } = router.query;

    const [boards, setBoards] = useState<WhiteBoard[]>([]);

    const createBoard = async () => {
        await appwrite.database.createDocument(
          process.env.APPWRITE_WHITEBOARDS_DATABASE_ID!,
          process.env.APPWRITE_WHITEBOARDS_COLLECTION_ID!,
          ID.unique(),
          {
            name: "New Board",
            teamId: id,
          }
        );
    }

  return (
    <Card>
      <CardHeader title="White Boards" subheader="List of white boards for this Team" />
      <Divider />
      <CardContent>
        <List>
          {boards.map((board) => (
            <Link
              href={`/dashboard/teams/${id}/whiteboards/${board.$id}`}
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

export default WhiteBoardWidget;
