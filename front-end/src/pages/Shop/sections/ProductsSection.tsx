import { useEffect, useState } from "react";
import { FilterBar } from "./FilterBar";
import { getProducts } from "@api/products";
import { ProductCard } from "@components/ProductCard";
import type { Product } from "@app-types/product";

interface ProductsSectionProps {
  category: string;
}

export function ProductsSection({ category }: ProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState("Default");
  const [isLoading, setIsLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const selectedCategory = category?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        let sortParam: "price" | undefined = undefined;
        let orderParam: "ASC" | "DESC" | undefined = undefined;

        if (sortBy === "Price: Low to High") {
          sortParam = "price";
          orderParam = "ASC";
        } else if (sortBy === "Price: High to Low") {
          sortParam = "price";
          orderParam = "DESC";
        }

        const response = await getProducts({
          page: currentPage,
          limit: itemsPerPage,
          category: selectedCategory,
          sort: sortParam,
          order: orderParam,
        });

        setProducts(response.data);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
      } catch (error) {
        console.error("Erro ao buscar produtos da Shop:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, selectedCategory, sortBy]);

  return (
    <section className="w-full bg-white">
      <FilterBar
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
        onSortChange={(value) => {
          setSortBy(value);
          setCurrentPage(1);
        }}
      />

      <div className="w-full bg-white py-10 px-4 lg:px-0">
        <div className="w-full max-w-[1240px] mx-auto">
          {isLoading ? (
            <div className="text-center py-12 font-poppins text-[#898989]">
              Carregando produtos...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 font-poppins text-[#898989]">
              Nenhum produto encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-[38px] mt-[30px]">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-[60px] h-[60px] rounded-[10px] font-poppins text-[20px] font-normal leading-none flex items-center justify-center cursor-pointer transition-colors ${
                      isActive
                        ? "bg-[#B88E2F] text-white"
                        : "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage >= totalPages}
                className="w-[98px] h-[60px] rounded-[10px] bg-[#F9F1E7] text-black font-poppins text-[20px] font-light leading-none flex items-center justify-center cursor-pointer hover:bg-[#B88E2F] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
