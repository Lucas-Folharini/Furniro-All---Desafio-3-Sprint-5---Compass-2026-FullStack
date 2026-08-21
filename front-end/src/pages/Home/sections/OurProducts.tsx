import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "@api/products";
import { ProductCard } from "@components/ProductCard";
import type { Product } from "@app-types/product";

export function OurProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const response = await getProducts({ limit: 8 });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-white py-12 flex flex-col items-center">
      <h2 className="font-poppins font-bold text-[40px] text-[#3A3A3A] mb-8 text-center">
        Our Products
      </h2>

      {isLoading ? (
        <div className="text-center py-12 font-poppins text-[#898989]">
          Loading products...
        </div>
      ) : (
        <div className="w-full max-w-[1183px] px-5 lg:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Link to="/shop">
        <button className="font-poppins font-semibold text-[16px] text-[#B88E2F] border border-[#B88E2F] bg-white py-3 px-16 hover:bg-[#B88E2F] hover:text-white transition-colors">
          Show More
        </button>
      </Link>
    </section>
  );
}
