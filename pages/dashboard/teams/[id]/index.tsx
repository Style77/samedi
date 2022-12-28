import { Button, Modal, ModalClose, Dialog, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ID, Query } from "appwrite";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import GridLayout from "../../../../components/dashboard/team/index/GridLayout";
import Navbar from "../../../../components/dashboard/team/index/Navbar";
import { useRequireAuth } from "../../../../hooks/useRequireAuth";
import { appwrite } from "../../../../store/appwrite";

export default function Dashboard() {
  useRequireAuth();

  const router = useRouter();
  const { id } = router.query;

  const [showBackgroundSelectorModal, setShowBackgroundSelectorModal] =
    useState(false);

  const [dashboardBackgroundUrl, setDashboardBackgroundUrl] = useState("");
  const [backgroundDocId, setBackgroundDocId] = useState("");

  useEffect(() => {
    if (id) {
      const fetchMembers = async () => {
        const members = await appwrite.teams.listMemberships(id as string);
        const user = await appwrite.account.get();
        let isMember = false;
        members.memberships.forEach((member) => {
          if (member.userId === user.$id) {
            isMember = true;
          }
        });
        if (!isMember) {
          router.push('/dashboard?alert="You are not a member of this team"');
        }
      };
      const fetchBackground = async () => {
        const docs = await appwrite.database.listDocuments(
          process.env.APPWRITE_TEAMS_DATABASE_ID!,
          process.env.APPWRITE_BACKGROUNDS_COLLECTION_ID!,
          [Query.equal("teamId", id as string)]
        );
        if (docs.documents.length > 0) {
          const doc = await appwrite.database.getDocument(
            process.env.APPWRITE_TEAMS_DATABASE_ID!,
            process.env.APPWRITE_BACKGROUNDS_COLLECTION_ID!,
            docs.documents[0].$id
          );
          setBackgroundDocId(doc.$id);
          setDashboardBackgroundUrl(docs.documents[0].backgroundUrl);
        }
      };

      fetchBackground();
      fetchMembers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const saveBackground = async () => {
    if (backgroundDocId) {
      await appwrite.database.updateDocument(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_BACKGROUNDS_COLLECTION_ID!,
        backgroundDocId,
        {
          backgroundUrl: dashboardBackgroundUrl,
          teamId: id as string,
        }
      );
    } else {
      await appwrite.database.createDocument(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_BACKGROUNDS_COLLECTION_ID!,
        ID.unique(),
        {
          backgroundUrl: dashboardBackgroundUrl,
          teamId: id as string,
        }
      );
    }
    setShowBackgroundSelectorModal(false);
  };

  return (
    <>
      <Head>
        <title>Samedi - dashboard</title>
      </Head>
      <Navbar />
      <main
        className="bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${dashboardBackgroundUrl})` }}
      >
        <Dialog
          open={showBackgroundSelectorModal}
          onClose={() => setShowBackgroundSelectorModal(false)}
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose />
          <Typography variant="h2">
            Choose background
          </Typography>
          <Typography>
            Choose a background for your dashboard from list
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div
                className="bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)`,
                  height: "100px",
                  width: "100%",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDashboardBackgroundUrl(
                    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  );
                }}
              ></div>
            </Grid>
            <Grid item xs={4}>
              <div
                className="bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80)`,
                  height: "100px",
                  width: "100%",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDashboardBackgroundUrl(
                    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
                  );
                }}
              ></div>
            </Grid>
            <Grid item xs={4}>
              <div
                className="bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80)`,
                  height: "100px",
                  width: "100%",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDashboardBackgroundUrl(
                    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
                  );
                }}
              ></div>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 3, marginBottom: 3 }} />
          <Button type="submit" onClick={saveBackground} variant="outlined">
            Save
          </Button>
        </Dialog>

        <GridLayout
          setShowBackgroundSelectorModal={setShowBackgroundSelectorModal}
        />
      </main>
    </>
  );
}
