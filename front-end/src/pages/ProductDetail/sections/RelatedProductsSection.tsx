import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "@api/products";
import { ProductCard } from "@components/ProductCard";
import type { Product } from "@app-types/product";

export function RelatedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const response = await getProducts({ limit: 5 });
        const filtered = response.data
          .filter((p) => String(p.id) !== id)
          .slice(0, 4);
        setProducts(filtered);
      } catch (error) {
        console.error("Erro ao carregar produtos relacionados:", error);
      }
    }

    fetchRelatedProducts();
  }, [id]);

  return (
    <section className="w-full pt-[55px] pb-[88px] bg-white font-poppins border-t border-[#D9D9D9]">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[99px] flex flex-col items-center">
        <h2 className="text-[36px] font-medium text-black leading-[100%] text-center mb-[26px]">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px] w-full mb-[44px]">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-[285px] mx-auto flex flex-col [&>a]:w-full [&>a]:h-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="w-[245px] h-[48px] border border-[#B88E2F] text-[#B88E2F] font-semibold text-[16px] leading-[150%] bg-white hover:bg-[#B88E2F] hover:text-white transition-colors duration-300 flex items-center justify-center cursor-pointer"
        >
          Show More
        </button>
      </div>
    </section>
  );
}
