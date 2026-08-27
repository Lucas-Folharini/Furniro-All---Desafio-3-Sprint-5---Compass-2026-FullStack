import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import bagIcon  from "@assets/bag-sidebar.svg"
const formatCurrency = (value: number) => {
  return `Rs. ${value.toLocaleString("id-ID")}`;
};

const getNumericPrice = (price: string, rawPrice?: number) => {
  if (rawPrice !== undefined) return rawPrice;
  const parsed = parseInt(price.replace(/\D/g, ""), 10);
  return isNaN(parsed) ? 0 : parsed;
};

export function CartSidebar() {
  const navigate = useNavigate();
  const { items, isOpen, closeSidebar, removeItem } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + getNumericPrice(item.price, item.rawPrice) * item.quantity,
    0
  );

  const handleNavigation = (path: string) => {
    closeSidebar();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-[100] transition-opacity"
        onClick={closeSidebar}
      />

      <div className="fixed top-0 right-0 w-full h-full sm:w-[417px] sm:h-[746px] bg-white z-[110] flex flex-col shadow-2xl p-7 font-poppins animate-slide-in">
      
        <div className="flex justify-between items-center pt-2">
          <h2 className="text-[24px] font-bold text-black">Shopping Cart</h2>
          <button onClick={closeSidebar} className="hover:opacity-70 transition">
            <img 
              src={bagIcon} 
              alt="Close Cart" 
              className="w-[16px] h-[19px] object-contain"
            />
          </button>
        </div>

        <div className="w-[287px] max-w-full h-[1px] bg-[#D9D9D9] mt-6 mb-6"></div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-5 pr-2">
          {items.length === 0 ? (
            <p className="text-[#9F9F9F] text-center mt-10">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-[105px] h-[105px] bg-[#F9F1E7] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-base text-black mb-1">{item.name}</h3>
                  <p className="text-base">
                    <span className="text-black font-light mr-3">{item.quantity}</span>
                    <span className="text-xs font-light mr-3">X</span>
                    <span className="text-[#B88E2F] font-medium text-sm">
                      {formatCurrency(getNumericPrice(item.price, item.rawPrice))}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="w-[20px] h-[20px] bg-[#9F9F9F] text-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-red-500 transition"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1L1 9M1 1L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex justify-between items-center mb-6 px-1">
            <span className="text-base text-black font-normal">Subtotal</span>
            <span className="text-base font-semibold text-[#B88E2F]">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="border-t border-[#D9D9D9] pt-6 flex gap-4 justify-center">
            <button
              onClick={() => handleNavigation("/cart")}
              className="w-full max-w-[130px] rounded-full border border-black py-[6px] text-xs font-normal text-black hover:bg-black hover:text-white transition"
            >
              Cart
            </button>
            <button
              onClick={() => handleNavigation("/checkout")}
              className="w-full max-w-[130px] rounded-full border border-black py-[6px] text-xs font-normal text-black hover:bg-black hover:text-white transition"
            >
              Checkout
            </button>
          </div>
        </div>

      </div>
    </>
  );
}