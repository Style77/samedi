import { Query } from "appwrite";
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
  
  const router = useRouter()
  const { id } = router.query

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
          router.push("/dashboard?alert=\"You are not a member of this team\"");
        };
      };
      
      fetchMembers()
    }
  }, [id]);

    return (
      <>
        <Head>
          <title>Samedi - dashboard</title>
        </Head>
        <Navbar />
        <main className="bg-[url(https://i.pinimg.com/originals/b5/35/db/b535db122e038eebb53dc7e63bfd65c3.jpg)] bg-cover bg-no-repeat">
          <GridLayout />
        </main>
      </>
    );
}