import { Link } from "react-router-dom";
import arrowIcon from "@assets/arrow.svg"; 
interface ProductBreadcrumbProps {
  productName?: string;
}

export function ProductBreadcrumb({ productName = "Asgaard sofa" }: ProductBreadcrumbProps) {
  return (
    <nav className="w-full bg-[#F9F1E7] h-[100px] flex items-center border-b border-[#E0D6C5]">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[98px] flex items-center gap-3 md:gap-5">
        <Link
          to="/"
          className="font-poppins font-normal text-[16px] text-[#9F9F9F] hover:text-black transition-colors"
        >
          Home
        </Link>

        <img src={arrowIcon} alt="" className="shrink-0 w-3 h-3" />

        <Link
          to="/shop"
          className="font-poppins font-normal text-[16px] text-[#9F9F9F] hover:text-black transition-colors"
        >
          Shop
        </Link>

        <img src={arrowIcon} alt="" className="shrink-0 w-3 h-3" />

        <div className="w-[2px] h-[37px] bg-[#9F9F9F] mx-1 md:mx-2" />

        <span className="font-poppins font-normal text-[16px] text-black truncate max-w-[220px] md:max-w-none">
          {productName}
        </span>
      </div>
    </nav>
  );
}
