import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProductSize = 'S' | 'M' | 'L' | 'XL';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: ProductSize;
  quantity: number;
  extras: {
    cheese?: number;
    beef?: number;
    sauce?: number;
    bacon?: number;
  };
}

interface AppState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, dir: 'up' | 'down') => void;
  updateExtras: (id: string, key: keyof CartItem['extras'], val: number) => void;
  clearCart: () => void;
  
  filters: {
    maxPrice: number;
    spicy: boolean;
    bestseller: boolean;
    newest: boolean;
    lowCal: boolean;
  };
  setFilter: (key: keyof AppState['filters'], value: any) => void;
  
  allergyWarningDismissed: boolean;
  dismissAllergyWarning: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find(
            (c) =>
              c.productId === item.productId &&
              c.size === item.size &&
              JSON.stringify(c.extras) === JSON.stringify(item.extras)
          );
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === existing.id
                  ? { ...c, quantity: c.quantity + item.quantity }
                  : c
              ),
            };
          }
          return { cart: [...state.cart, { ...item, id: Math.random().toString(36).substring(7) }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.id !== id),
        })),
      updateQuantity: (id, dir) =>
        set((state) => ({
          cart: state.cart.map((c) => {
            if (c.id === id) {
              const newQuantity = dir === 'up' ? c.quantity + 1 : Math.max(1, c.quantity - 1);
              return { ...c, quantity: newQuantity };
            }
            return c;
          })
        })),
      updateExtras: (id, key, val) =>
        set((state) => ({
          cart: state.cart.map((c) => {
            if (c.id === id) {
              return { ...c, extras: { ...c.extras, [key]: val } };
            }
            return c;
          })
        })),
      clearCart: () => set({ cart: [] }),
      
      filters: {
        maxPrice: 2000,
        spicy: false,
        bestseller: false,
        newest: false,
        lowCal: false,
      },
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
        
      allergyWarningDismissed: false,
      dismissAllergyWarning: () => set({ allergyWarningDismissed: true }),
    }),
    {
      name: 'sauce-n-cheese-storage',
    }
  )
);
