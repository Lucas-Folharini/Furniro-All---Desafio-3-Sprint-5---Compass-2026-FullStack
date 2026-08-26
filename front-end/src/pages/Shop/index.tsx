import { useSearchParams } from "react-router-dom";

import { Banner } from "@components/PageBanner";
import { FeaturesSection } from "@components/FeaturesSection";

import { ProductsSection } from "./sections/ProductsSection";

export function Shop() {
  const [searchParams] = useSearchParams();

  const categoryFilter = searchParams.get("category") || "";

  return (
    <div className="w-full min-h-screen bg-white">
      <main>
        <Banner title={categoryFilter ? categoryFilter : "Shop"} />

        <ProductsSection
          key={categoryFilter || "all"}
          category={categoryFilter}
        />
        <FeaturesSection />
      </main>
    </div>
  );
}

export default Shop;
