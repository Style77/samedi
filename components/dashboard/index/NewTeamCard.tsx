import { Card, Divider, TextField } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import { ID, Permission, Role } from "appwrite";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { appwrite } from "../../../store/appwrite";
import Button from "@mui/material/Button";

const maxTeamsCount = 3;

const defaultLayout = [
  { i: "a", x: 0, y: 0, w: 1, h: 1 },
  { i: "b", x: 1, y: 0, w: 1, h: 1 },
  { i: "c", x: 2, y: 0, w: 1, h: 1 },
  { i: "d", x: 3, y: 0, w: 1, h: 1 },
  { i: "e", x: 4, y: 0, w: 1, h: 1 },
  { i: "f", x: 5, y: 0, w: 1, h: 1 },
  { i: "g", x: 6, y: 0, w: 1, h: 1 },
  { i: "h", x: 7, y: 0, w: 1, h: 1 },
  { i: "i", x: 8, y: 0, w: 1, h: 1 },
  { i: "j", x: 9, y: 0, w: 1, h: 1 },
  { i: "k", x: 10, y: 0, w: 1, h: 1 },
  { i: "l", x: 11, y: 0, w: 1, h: 1 },
];

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
          tiles: defaultLayout.map((tile) => {
            return JSON.stringify(tile);
          }),
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
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ minWidth: 275, minHeight: 210 }}>
        <CardHeader
          title="Create new team"
          subheader={`
        You can create up to ${maxTeamsCount} teams.
        You have ${maxTeamsCount - teamsLength} teams left.
      `}
        />
        <Divider />
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={createTeam}>
            <div className="flex flex-row justify-between mt-2">
              <TextField
                id="teamName"
                label="Team Name"
                variant="standard"
                placeholder="Enter Team Name"
                type="text"
                name="teamName"
                ref={teamNameRef}
                required
              />
              {teamStatus && (
                <>
                  <Typography variant="body2" color="error">
                    {teamStatus}
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    endIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </>
              )}
              {teamError && (
                <>
                  <Typography variant="body2" color="error">
                    {teamError}
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    endIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </>
              )}
              {!teamStatus && !teamError && (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<AddIcon />}
                >
                  Add
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewTeamCard;
