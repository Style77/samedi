import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import List from "@mui/material/List";
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
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ minWidth: 275, minHeight: 210 }}>
        <CardHeader
          title="Your teams"
          subheader={`
        You can see all your teams here. 
      `}
        />
        <Divider />
        <CardContent>
          <List>
            {teams.map((team: any) => (
              <ListItem disablePadding key={team.$id}>
                <Link
                  href="/dashboard/teams/[id]"
                  as={`/dashboard/teams/${team.$id}`}
                  key={team.$id}
                >
                  <ListItemButton>
                    <ListItemText
                      primary={`${team.name} (${team.total} members)`}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TeamsCard;
