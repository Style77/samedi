import {
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
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

const ConferencesWidget = () => {
  const { id } = useRouter().query;

  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);

  const [conferences, setConferences] = useState<any[]>([]);

  useEffect(() => {
    const checkIfOwner = async () => {
      let memberships = await appwrite.teams.listMemberships(id as string, [
        Query.equal("userId", (await appwrite.account.get()).$id),
      ]);
      console.log(memberships);

      if (memberships.memberships[0].roles.includes("owner")) {
        setIsOwner(true);
      }
    };

    const getConferences = async () => {
      let channels = await appwrite.database.listDocuments(
        process.env.APPWRITE_CONFERENCES_DATABASE_ID!,
        process.env.APPWRITE_CHANNELS_COLLECTION_ID!,
        [Query.equal("teamId", id as string), Query.equal("ended", "")]
      );
      setConferences(channels.documents);
    };

    getConferences();
    checkIfOwner();
  }, [id]);

  const startNewConference = async () => {
    let conference = await appwrite.database.createDocument(
      process.env.APPWRITE_CONFERENCES_DATABASE_ID!,
      process.env.APPWRITE_CHANNELS_COLLECTION_ID!,
      ID.unique(),
      {
        name: "New conference",
        teamId: id,
      }
    );

    router.push(`/dashboard/team/${id}/conferences/${conference["$id"]}`);
  };

  return (
    <Card>
      <CardHeader
        title="Conferences"
        subheader="Current conferences for this team"
      />
      <Divider />
      <CardContent>
        <List>
          {conferences &&
            conferences.map((conference) => (
              <Link
                href={`/dashboard/team/${id}/conferences/${conference.$id}`}
                key={conference.$id}
              >
                <ListItemButton>
                  <ListItemText primary={conference.name} />
                </ListItemButton>
              </Link>
            ))}
          {!conferences.length && (
            <ListItem>
              <ListItemText primary="No conferences yet" />
            </ListItem>
          )}
        </List>
      </CardContent>
      <Divider />
      {isOwner && (
        <CardActions>
          <Button
            variant="outlined"
            color="inherit"
            onClick={startNewConference}
            {...(conferences.length !== 0 && { disabled: true })}
          >
            Start new conference
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ConferencesWidget;
