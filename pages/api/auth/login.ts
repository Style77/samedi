// Totally useless (and not functional), just to stay consistent with the rest of the code

import type { NextApiRequest, NextApiResponse } from "next";
import { appwrite } from "../../../store/appwrite";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  appwrite.account
    .createEmailSession(req.body.email, req.body.password)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error.code).json({error: error.message});
    });
}
