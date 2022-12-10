import { ID } from "appwrite";
import type { NextApiRequest, NextApiResponse } from "next";
import { appwrite } from "../../../store/appwrite";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
    appwrite.account.create(ID.unique(), req.body.email, req.body.password, req.body.name).then((response) => {
        res.status(200).json(response);
    }, (error: any) => {
        res.status(error.code).json({ error: error.message });
    });
}
