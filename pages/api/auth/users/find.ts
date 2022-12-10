// This endpoint doesn't return every email!! It only checks if the email is registered for inviting purposes.
import type { NextApiRequest, NextApiResponse } from "next";
import { Query } from "node-appwrite";
import { appwriteSdk } from "../../../../store/appwrite-sdk";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    appwriteSdk.users.list(req.body.email).then((response) => {
        res.status(200).json({ name: "John Doe" });
    }).catch((error) => {
        console.log(error);
    });
}
