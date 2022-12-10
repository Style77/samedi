import { useTranslation } from "next-i18next";

import { FcCheckmark, FcCancel } from "react-icons/fc";


const Feature = ({
  text,
  available = true,
}: {
  text: string;
  available?: boolean;
}) => {
  return (
    <li className="flex items-center space-x-3">
      {available ? <FcCheckmark /> : <FcCancel />}
      <span>{text}</span>
    </li>
  );
};

type CardProps = {
  label: string;
  description: string;
  price: number;
  children: React.ReactNode;
};

const Card = ({ label, description, price, children }: CardProps) => {
  const { t } = useTranslation("common");

  const fetchCurrency = (price: number) => {
    let currency = "USD";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  }

  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm w-full">
      <h3 className="mb-4 text-2xl font-semibold">{label}</h3>
      <p className="font-light text-gray-500 sm:text-lg">{description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">{fetchCurrency(price)}</span>
        <span className="text-gray-500">/{t("index.pricing.per")}</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {children}
      </ul>
      <a
        href="#"
        className="text-gray-800 border-2 border-gray-400/50 bg-white hover:bg-gray-100 hover:text-gray-900 transition focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {t("index.hero.button")}
      </a>
    </div>
  );
};

export { Card, Feature };
