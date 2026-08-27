import { Link } from "react-router-dom";
import bannerImg from "@assets/banner_shop.png";
import logo from "@assets/logo.svg";

interface BannerProps {
  title: string;
  breadcrumb?: string;
}

export function Banner({ title, breadcrumb }: BannerProps) {
  return (
    <section
      className="w-full h-[316px] bg-cover bg-center flex flex-col items-center justify-center relative mt-[100px]"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <img src={logo} alt="Furniro Logo" className="w-14 h-14 mb-[-10px]" />

        <h1 className="text-[48px] font-medium text-[#000000] leading-[72px] h-[72px] flex items-center justify-center">
          {title}
        </h1>

        <nav className="flex items-center gap-1.5 text-base text-black mt-2">
          <Link
            to="/"
            className="font-medium hover:opacity-75 transition-opacity"
          >
            Home
          </Link>
          <span className="font-medium">&gt;</span>
          <span className="font-light text-black">{breadcrumb || title}</span>
        </nav>
      </div>
    </section>
  );
}
