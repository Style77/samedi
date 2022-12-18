// hello widget component

import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { appwrite } from "../../../../../store/appwrite";

import Image from "next/image";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const HelloWidget = () => {
  const [user, setUser] = useState<Models.Account<Models.Preferences>>();

  const fetchUser = async () => {
    const user = await appwrite.account.get();
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, [])
  

  return (
    <>
      <Card>
        <CardHeader title={`Hello ${user?.name},`} subheader="Have a nice day!" className="select-none" />
        <div className="justify-end items-end flex">
          <Image
            src="/images/widgets/assets/b7a.gif"
            alt="nyan"
            height={200}
            width={200}
            className="select-none"
          />
        </div>
      </Card>
    </>
  );
};

export default HelloWidget;