import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductBreadcrumb } from "./sections/ProductBreadcrumb";
import { ProductDetailsSection } from "./sections/ProductDetailsSection";
import { ProductTabsSection } from "./sections/ProductTabsSection";
import { RelatedProductsSection } from "./sections/RelatedProductsSection";
import { getProduct } from "@api/products";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [productName, setProductName] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    async function fetchProductName() {
      try {
        const targetId = id || "1";
        const data = await getProduct(targetId);
        if (data?.name) {
          setProductName(data.name);
        }
      } catch (error) {
        console.error(
          "Erro ao buscar nome do produto para o Breadcrumb:",
          error,
        );
      }
    }

    fetchProductName();
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-white pt-[110px]">
      <main>
        <ProductBreadcrumb productName={productName || "Detalhes do Produto"} />

        <ProductDetailsSection />

        <ProductTabsSection />

        <RelatedProductsSection />
      </main>
    </div>
  );
}

export default ProductDetail;
