// This endpoint doesn't return every email!! It only checks if the email is registered for inviting purposes.
import type { NextApiRequest, NextApiResponse } from "next";
import { Query } from "node-appwrite";
import { appwriteSdk } from "../../../../store/appwrite-sdk";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    appwriteSdk.users.list(req.body.email).then((response) => {
        res.status(200).json(response.users[0]);
    }).catch((error) => {
        console.log(error);
        res.status(error.code).json({error: error.message});
    });
}
