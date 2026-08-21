import { useParams } from "react-router-dom";

import { Banner } from "@components/PageBanner";
import { FeaturesSection } from "@components/FeaturesSection";

import { ProductsSection } from "./sections/ProductsSection";

export function Shop() {
  const { category = "" } = useParams();

  return (
    <div className="w-full min-h-screen bg-white">
      <main>
        <Banner title="Shop" />
        
        <ProductsSection key={category || "all"} category={category} />
        
        <FeaturesSection />
      </main>
    </div>
  );
}

export default Shop;
