import { Query } from "appwrite";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import GridLayout from "../../../components/dashboard/team/index/GridLayout";
import Navbar from "../../../components/dashboard/team/index/Navbar";
import { appwrite } from "../../../store/appwrite";

export default function Dashboard() {
  const router = useRouter()
  const { id } = router.query

    return (
      <>
        <Head>
          <title>Samedi - dashboard</title>
        </Head>
        <Navbar />
        <main>
          <GridLayout/>
        </main>
      </>
    );
}