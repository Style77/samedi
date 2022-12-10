import { Client as Appwrite, Account, Databases, Teams } from "appwrite";
import { atom } from "recoil";
import { User } from "../types/user";

export const Server = {
  endpoint: process.env.APPWRITE_APP_ENDPOINT!,
  project: process.env.APPWRITE_PROJECT_ID!,
  collectionID: process.env.APPWRITE_COLLECTION_ID!,
  databaseID: process.env.APPWRITE_DATABASE_ID!,
};

if (
    Server.endpoint === undefined ||
    Server.project === undefined
) {
    throw new Error("Appwrite server not configured");
}

export const client = new Appwrite()
  .setEndpoint(Server.endpoint)
  .setProject(Server.project);

const account = new Account(client);
const database = new Databases(client);
const teams = new Teams(client);

export const appwrite = { account, database, teams };