// This endpoint doesn't return every email!! It only checks if the email is registered for inviting purposes.
import type { NextApiRequest, NextApiResponse } from "next";
import { Query } from "node-appwrite";

import { Client, Users } from "node-appwrite";
import { appwrite } from "../../../store/appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY_USERS_READ!);

const users = new Users(client);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            appwrite.account.getSession(req.body.sessionId).then((data) => {
                if (data) {
                    users.list(req.body.email).then((response) => {
                        res.status(200).json(response.users[0]);
                    }).catch((error) => {
                        res.status(error.code).json({error: error.message});
                    });
                } else {
                    res.status(401).json({ error: "Unauthorized" });
                }
            });
        default:
            res.status(405).json({ error: "Method not allowed" });
        }
}
