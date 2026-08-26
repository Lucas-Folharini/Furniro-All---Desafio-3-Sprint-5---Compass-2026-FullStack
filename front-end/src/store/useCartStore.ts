import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@app-types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        // Usar set((state) => ...) garante 100% que estamos pegando a lista atualizada
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          } else {
            return { items: [...state.items, { ...product, quantity }] };
          }
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "shopping-cart-storage", // Nome que ficará no LocalStorage
    },
  ),
);

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    
    if (event.key === "shopping-cart-storage") {
      useCartStore.persist.rehydrate();
    }
  });
}
