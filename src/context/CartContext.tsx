import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  category?: string;
  date?: string;
  time?: string;
  badge?: string;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (name: string, price: string, category?: string, badge?: string, image?: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'item-1',
      name: 'Cinematic Drone Shoot (Site 4)',
      price: '$1,250.00',
      category: 'Airborne Ops',
      date: 'Nov 18, 2025',
      time: '10:00 AM',
      badge: 'DGCA Pilot Tier',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc0ur4eONaHz3hSlJZTGp-EPYqSLs5ntWFctQFyEfLrODEzRU-dT12dshsxdJa4OX2yKNjmdisSPP1DKKcZBdRYGL4Cw8RAVk2YTPpLAr523HkwSj3jkCXGl0BzMbTS4OQZO7GGuKyppqYS1ZjB7d3v_EE39fDDDuxdK3PZIxHmPbmQFHfMNUoaQD6U32S3HyO7WK_17cLdQIs2ba3PuI8drJS3eMSVmCdtEbEOOVOUnfNGGQqxlm6',
    },
    {
      id: 'item-2',
      name: 'VR Architectural Interior Walkthrough',
      price: '$850.00',
      category: 'Spatial Synthesis',
      date: 'Cloud Sync BIM',
      badge: 'Interactive WebGL',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdMeZSTrSsovMDlONGY1TYT8TrC6sr60NO1pCkUWXLpjxxGrIekhte8BZQGP3UPbeUlQOW2XRbczfP5r8CI-0ZZotYmZZVq-Jb6W78d1Ytn_4i4WxZADjqfhXbvxzBVaLLyNl6zE2s8UBPHy39fVMcII3x12P6fIVfnvkXSTjhbPQ9GliYGli3_9QQNI4qoNZiICrhNX6AVyhI_FPBKnxZac9TlEl1eE-GldeMKHaBF86WjPxEk5TY',
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (name: string, price: string, category?: string, badge?: string, image?: string) => {
    const newItem: CartItem = {
      id: 'item-' + Date.now(),
      name,
      price,
      category: category || 'Enterprise Service',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: '10:00 AM',
      badge: badge || 'Verified SLA',
      image: image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc0ur4eONaHz3hSlJZTGp-EPYqSLs5ntWFctQFyEfLrODEzRU-dT12dshsxdJa4OX2yKNjmdisSPP1DKKcZBdRYGL4Cw8RAVk2YTPpLAr523HkwSj3jkCXGl0BzMbTS4OQZO7GGuKyppqYS1ZjB7d3v_EE39fDDDuxdK3PZIxHmPbmQFHfMNUoaQD6U32S3HyO7WK_17cLdQIs2ba3PuI8drJS3eMSVmCdtEbEOOVOUnfNGGQqxlm6',
    };
    setCart((prev) => [newItem, ...prev]);
    showToast(`${name} (${price}) added to dispatch docket`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
