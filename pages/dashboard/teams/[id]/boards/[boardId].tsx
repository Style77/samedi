import Head from "next/head";
import { useRouter } from "next/router";
import Board from "../../../../../components/dashboard/boards/Board";
import Navbar from "../../../../../components/dashboard/team/index/Navbar";
import { useRequireAuth } from "../../../../../hooks/useRequireAuth";

export default function Boards() {
    useRequireAuth();

    const router = useRouter();
    const { id, boardId } = router.query;
    
    return (
      <>
        <Head>
          <title>Samedi - dashboard</title>
        </Head>
            <Navbar />
        <main style={{ height: "calc(100vh-64px)" }}>
            <Board boardId={boardId as string}></Board>
        </main>
      </>
    );
}