// type Provider = {
//   name: string;
//   uid: string;
//   accessToken: string;
//   accessTokenExpiry: string;
//   refreshToken: string;
// };

// type TechInfo = {
//   ip: string;
// //   os: { osCode: string; osName: string; osVersion: string };
// };

// export type User = {
//   id: string;
//   name: string;
//   email: string;

//   provider: Provider;
//   tech: TechInfo;
//   country: { code: string; name: string };

//   current: boolean;
// };

export type User = {
  $id: string;
  email: string;
  name: string;
};