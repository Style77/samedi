import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useRequireAuth = (redirect_url: string="/signin") => {
    const { getCurrentUser } = useAuth();
    const router = useRouter();
    
    useEffect(() => {  // todo
        const checkUser = async () => {
            let user;

            try {
                user = await getCurrentUser();
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