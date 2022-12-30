import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { appwrite } from "../../../../../store/appwrite";

import { WhiteBoard } from "../../../../../helpers/WhiteBoard";
import DrawingBoard from "../../../../../components/dashboard/whiteboards/DrawingBoard";

export default function WhiteBoardPage() {
    const router = useRouter();
    const { id, boardId } = router.query;

    const [board, setBoard] = useState<WhiteBoard | null>(null);
    // const [operations, setOperations] = useState<Operation[]>([]);

    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        if (id && boardId) {
            appwrite.database.getDocument(
                process.env.APPWRITE_WHITEBOARDS_DATABASE_ID!,
                process.env.APPWRITE_WHITEBOARDS_COLLECTION_ID!,
                boardId as string
            ).then((response) => {
                setBoard(response as unknown as WhiteBoard);
            });
        }

        const fetchUserId = async () => {
            const user = await appwrite.account.get();
            const userId = user!.$id;
            setUserId(userId);
        }

        fetchUserId();
    }, [id, boardId]);

    return (
      <>
        <DrawingBoard />
      </>
    );
}