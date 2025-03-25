'use client';
import { Product } from '@/lib/utils';
import React, { useContext, useState } from 'react';
import { createContext } from 'react';

type NavContextType = {
  isOpen: boolean;
  collapse: boolean;
  isWide: boolean;
  handleToggle: () => void;
  closeSideBar: () => void;
  handleCollapse: () => void;
  toggleSiderbarWidth: () => void;
};
interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
}

//Createcontext
export const NavContextProvider = createContext<NavContextType | null>(null);
export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

//Context Api
export default function NavContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  //toggle function
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  //sidebar function
  const closeSideBar = () => {
    setIsOpen(false);
  };
  //collapse function
  const handleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  //toggle width
  const toggleSiderbarWidth = () => {
    setIsWide((prev) => !prev);
  };
  //addTocart function
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  return (
    <NavContextProvider.Provider
      value={{
        isWide,
        isOpen,
        handleToggle,
        collapse,
        toggleSiderbarWidth,
        handleCollapse,
        closeSideBar,
      }}
    >
      <CartContext value={{ cart, addToCart }}>{children}</CartContext>
    </NavContextProvider.Provider>
  );
}

export const useNav = () => {
  const context = useContext(NavContextProvider);
  if (!context) {
    throw new Error('it must be used within a Provider');
  }
  return context;
};

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('it must be used within a Provider');
  }
  return cart;
};
