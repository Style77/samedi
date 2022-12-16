// This endpoint doesn't return every email!! It only checks if the email is registered for inviting purposes.
import type { NextApiRequest, NextApiResponse } from "next";
import { Account, Query } from "node-appwrite";

import { Client, Users } from "node-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY_USERS_READ!);

const users = new Users(client);
const account = new Account(client);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, sessionId } = req.query;

  if (!userId || !sessionId) {
    res.status(400).json({ error: "Bad request" });
  }

  switch (req.method) {
    case "GET":
      account.getSession(sessionId as string).then((data) => {
        if (data) {
          users
            .listMemberships(userId as string)
            .then((response) => {
              res.status(200).json(response.memberships);
            })
            .catch((error) => {
              res.status(error.code).json({ error: error.message });
            });
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      });
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
