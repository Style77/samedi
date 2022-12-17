import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Card, Feature } from "../components/pricing/Card";
import { appwrite } from "../store/appwrite";
import { selectAuthState, setAuthState } from "../store/auth/authSlice";

export default function Home() {
  const { t } = useTranslation("common");
  
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await appwrite.account.get();
      if (user) {
        dispatch(setAuthState(true));
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Samedi</title>
        <meta name="description" content="Samedi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="min-h-screen">
        <section
          id="hero"
          className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-b from-violet-300/50 to-white"
        >
          <h1 className="text-8xl text-gray-900 font-thin">Samedi</h1>
          <h2 className="mt-3 text-xl text-gray-700 font-thin">
            {t("index.hero.subtitle")}
            <a className="text-[#2D033B] font-normal">
              {t("index.hero.business")}
            </a>
          </h2>
          <div className="flex flex-row gap-4">
            <a
              href="#about"
              className="mt-6 px-5 py-3 bg-gray-100 text-gray-800 border-[1px] border-gray-400/25 font-semibold rounded-md hover:bg-gray-50 hover:text-gray-900 transition duration-300 shadow-lg"
            >
              {t("index.hero.button")}
            </a>
            {authState ? (
              <Link
                href="/dashboard"
                className="mt-6 px-5 py-3 bg-[#2D033B] text-gray-100 border-[1px] border-gray-400/25 font-semibold rounded-md hover:bg-[#461557] hover:text-gray-50 transition duration-300 shadow-lg"
              >
                {t("index.hero.dashboard_button")}
              </Link>
            ) : (
              <Link
                href="/signin"
                className="mt-6 px-5 py-3 bg-[#2D033B] text-gray-100 border-[1px] border-gray-400/25 font-semibold rounded-md hover:bg-[#461557] hover:text-gray-50 transition duration-300 shadow-lg"
              >
                {t("index.hero.signin_button")}
              </Link>
            )}
          </div>
        </section>
        <section
          id="about"
          className="flex flex-col min-h-screen items-center py-4"
        >
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-thin text-gray-900">
              {t("index.about.title")}
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl">
              {t("index.about.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap">
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
              <div className="h-full rounded-lg p-6 lg:pl-12 text-gray-800 flex items-center text-center lg:text-left">
                <div className="lg:pl-12 flex-col items-center w-full">
                  <h2 className="text-3xl font-bold mb-6">
                    {t("index.about.features.first.label")}
                  </h2>
                  <p className="mb-6 pb-2 lg:pb-0">
                    {t("index.about.features.first.description")}
                  </p>
                  <button
                    type="button"
                    className="inline-block px-7 py-3 border-2 border-gray-800 text-gray-800 font-medium text-sm leading-snug uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    {t("index.about.readMore")}
                  </button>
                </div>
              </div>
            </div>
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 mb-12 lg:mb-0">
              <div className="flex lg:py-12 w-full items-center">
                <Image
                  src="/images/stock/bus1.svg"
                  height={500}
                  width={500}
                  className="w-full rounded-lg mx-4"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 mb-12 lg:mb-0 lg:order-first order-last">
              <div className="flex lg:py-12">
                <Image
                  src="/images/stock/bus2.svg"
                  height={500}
                  width={500}
                  className="w-full rounded-lg mx-4"
                  alt=""
                />
              </div>
            </div>
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
              <div className="h-full rounded-lg p-6 lg:pl-12 text-gray-800 flex items-center text-center lg:text-left">
                <div className="lg:pl-12 flex-col items-center w-full">
                  <h2 className="text-3xl font-bold mb-6 ">
                    {t("index.about.features.second.label")}
                  </h2>
                  <p className="mb-6 pb-2 lg:pb-0">
                    {t("index.about.features.second.description")}
                  </p>
                  <button
                    type="button"
                    className="inline-block px-7 py-3 border-2 border-gray-800 text-gray-800 font-medium text-sm leading-snug uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    {t("index.about.readMore")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
              <div className="h-full rounded-lg p-6 lg:pl-12 text-gray-800 flex items-center text-center lg:text-left">
                <div className="lg:pl-12 flex-col items-center w-full">
                  <h2 className="text-3xl font-bold mb-6">
                    {t("index.about.features.third.label")}
                  </h2>
                  <p className="mb-6 pb-2 lg:pb-0">
                    {t("index.about.features.third.description")}
                  </p>
                  <button
                    type="button"
                    className="inline-block px-7 py-3 border-2 border-gray-800 text-gray-800 font-medium text-sm leading-snug uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    {t("index.about.readMore")}
                  </button>
                </div>
              </div>
            </div>
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 mb-12 lg:mb-0">
              <div className="flex lg:py-12">
                <Image
                  src="/images/stock/bus3.webp"
                  height={30}
                  width={300}
                  className="w-full rounded-lg mx-4"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="flex flex-col items-center justify-center min-h-screen py-4"
        >
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-4xl tracking-tight font-thin text-gray-900">
                {t("index.pricing.title")}
              </h2>
              <p className="mb-5 font-light text-gray-500 sm:text-xl">
                {t("index.pricing.subtitle")}
              </p>
            </div>

            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 gap-4 lg:space-y-0">
              <Card
                label={t("index.pricing.plans.starter.label")}
                description={t("index.pricing.plans.starter.description")}
                price={parseInt(t("index.pricing.plans.starter.price"))}
              >
                <Feature
                  text={t("index.pricing.plans.starter.features.first")}
                />
                <Feature
                  text={t("index.pricing.plans.starter.features.second")}
                />
                <Feature
                  text={t("index.pricing.plans.starter.features.third")}
                  available={false}
                />
                <Feature
                  text={t("index.pricing.plans.starter.features.fourth")}
                  available={false}
                />
                <Feature
                  text={t("index.pricing.plans.starter.features.fifth")}
                  available={false}
                />
              </Card>
              <Card
                label={t("index.pricing.plans.professional.label")}
                description={t("index.pricing.plans.professional.description")}
                price={parseInt(t("index.pricing.plans.professional.price"))}
              >
                <Feature
                  text={t("index.pricing.plans.professional.features.first")}
                />
                <Feature
                  text={t("index.pricing.plans.professional.features.second")}
                />
                <Feature
                  text={t("index.pricing.plans.professional.features.third")}
                />
                <Feature
                  text={t("index.pricing.plans.professional.features.fourth")}
                  available={false}
                />
                <Feature
                  text={t("index.pricing.plans.professional.features.fifth")}
                  available={false}
                />
              </Card>
              <Card
                label={t("index.pricing.plans.enterprise.label")}
                description={t("index.pricing.plans.enterprise.description")}
                price={parseInt(t("index.pricing.plans.enterprise.price"))}
              >
                <Feature
                  text={t("index.pricing.plans.enterprise.features.first")}
                />
                <Feature
                  text={t("index.pricing.plans.enterprise.features.second")}
                />
                <Feature
                  text={t("index.pricing.plans.enterprise.features.third")}
                />
                <Feature
                  text={t("index.pricing.plans.enterprise.features.fourth")}
                />
                <Feature
                  text={t("index.pricing.plans.enterprise.features.fifth")}
                />
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
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
