import * as jose from "jose";

import { v4 as uuidv4 } from "uuid";

var app_access_key = process.env.SAMEDI_LIVE_ACCESS_KEY;
var app_secret = process.env.SAMEDI_LIVE_SECRET_KEY;

var alg = "HS256"

const secret = new TextEncoder().encode(app_secret as string);

export const generateManagementToken = async () => {
  return await new jose.SignJWT({
    access_key: app_access_key as string,
    type: "management",
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),
  })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .setJti(uuidv4())
    .sign(secret);
};
