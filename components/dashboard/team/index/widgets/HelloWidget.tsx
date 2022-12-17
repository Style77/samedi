// hello widget component

import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { appwrite } from "../../../../../store/appwrite";

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
      <div className="border-2 p-4 border-gray-800 bg-gray-300 w-full h-full select-none flex flex-col">
        <h1 className="">Hello, {user?.name}</h1>
        <h2 className="text-sm">Have a nice day!</h2>
      </div>
    </>
  );
};

export default HelloWidget;