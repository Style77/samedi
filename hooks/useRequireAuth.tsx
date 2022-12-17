import { useRouter } from "next/router";
import { useEffect } from "react";
import { appwrite } from "../store/appwrite";

export const useRequireAuth = (redirect_url: string="/signin?alert=\"Login to access to this page!\"") => {
    const router = useRouter();
    
    useEffect(() => {  // todo
        const checkUser = async () => {
            let user;

            try {
                user = await appwrite.account.get();
            } catch (error: any) {
                user = null;
            }

            if (!user) {
                router.push(redirect_url);
            }
        };
        checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};