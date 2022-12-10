import { useState } from "react";
import Loading from "../common/Loading";

import { FiEye, FiEyeOff } from "react-icons/fi"
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

type RegisterFormProps = {
    children?: React.ReactNode;
}

const RegisterForm = ({children}: RegisterFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const { t } = useTranslation("common");

    // const { createAccount } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
                setLoading(false);
                return;
            }
            setSuccess(true);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
      <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <div className="bg-white rounded-lg p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{t("register.success")}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2 text-gray-600/100 transition duration-300"
              >
                {t("register.name")}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={t("register.placeholders.name")!}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-gray-600/100 transition duration-300"
              >
                {t("register.email")}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={t("register.placeholders.email")!}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-gray-600/100 transition duration-300"
              >
                {t("register.password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 mt-3 mr-3 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-semibold mb-2 text-gray-600/100 transition duration-300"
              >
                {t("register.passwordConfirm")}
              </label>
              <div className="relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="••••••••"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 mt-3 mr-3 focus:outline-none"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-violet-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
                disabled={loading}
              >
                {loading && <Loading h={5} w={5} />}
                {t("register.submit")}
              </button>
              {children}
            </div>
          </form>
        </div>
      </div>
    );
};

export default RegisterForm;