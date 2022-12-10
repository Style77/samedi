import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import LoginForm from "../components/signin/LoginForm";
import RegisterForm from "../components/signin/RegisterForm";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { t } = useTranslation("common");
  const [showRegister, setShowRegister] = useState(false);

  const { createAccount, logIn, getCurrentUser } = useAuth();

  return (
    <>
      <Head>
        <title>Samedi</title>
        <meta name="description" content="Samedi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <section className="h-screen">
          <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <Image
                  src="/images/stock/bus4.webp"
                  width={750}
                  height={750}
                  alt=""
                />
              </div>
              {showRegister ? (
                <RegisterForm>
                  <p className="font-regular mt-2 pt-1 mb-0">
                    {t("register.login")}{" "}
                    <a
                      href="#!"
                      className="text-violet-600 hover:text-violet-700 focus:text-violet-700 font-semibold transition duration-200 ease-in-out"
                      onClick={() => setShowRegister(false)}
                    >
                      {t("register.loginLink")}
                    </a>
                  </p>
                </RegisterForm>
              ) : (
                <LoginForm>
                  <p className="font-regular mt-2 pt-1 mb-0">
                    {t("login.register")}{" "}
                    <a
                      href="#!"
                      className="text-violet-600 hover:text-violet-700 focus:text-violet-700 font-semibold transition duration-200 ease-in-out"
                      onClick={() => setShowRegister(true)}
                    >
                      {t("login.registerLink")}
                    </a>
                  </p>
                </LoginForm>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
}
