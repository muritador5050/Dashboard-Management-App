'use client';
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

export const NavContextProvider = createContext<NavContextType | null>(null);
export default function NavContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const closeSideBar = () => {
    setIsOpen(false);
  };
  const handleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  const toggleSiderbarWidth = () => {
    setIsWide((prev) => !prev);
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
      {children}
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
