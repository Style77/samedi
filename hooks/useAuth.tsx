import { ID } from "appwrite";
import { appwrite } from "../store/appwrite";

export const useAuth = () => {
  const createAccount = async (email: string, password: string) => {
    try {
      // Create user account
      await appwrite.account.create(ID.unique(), email, password);

      // Create user session
      return await appwrite.account.createEmailSession(email, password);

      // // Start email verification
      // return appwrite.account.createVerification(
      //   `${window.location.origin}/verify/account`
      // );
    } catch (e) {
      return e;
    }
  };

  const logIn = (email: string, password: string) => {
    try {
      return appwrite.account.createEmailSession(email, password);
    } catch (e) {
      return e;
    }
  };

  const getCurrentUser = () => {
    return appwrite.account.get();
  };

  const signOutUser = async () => {
    try {
      await appwrite.account.deleteSession("current");
    } catch (e) {
      return e;
    }
  };

  return {
    createAccount,
    logIn,
    getCurrentUser,
    signOutUser,
  };
};
