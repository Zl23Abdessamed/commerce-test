"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";
import { useCart } from "./ShoppingCartContext";
import Link from "next/link";


interface CartLinkProps {
  cartCount: number;
  onClick?: () => void;
}

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function Header() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { cartCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = (): void => setDrawerOpen(!drawerOpen);

  if (!mounted) {
    return (
      <div className="bg-white shadow-md text-center py-4">
        <div className="animate-pulse text-green-700 text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <header className="bg-white shadow-md w-screen">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-green-700"
        >
          CosmoCare
        </motion.h1>

        <div className="md:hidden">
          <IoMenu
            className="text-3xl text-green-700 cursor-pointer"
            onClick={toggleDrawer}
          />
        </div>

        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink href="/" label="Home" />
          <NavLink href="/products" label="Products" />
          <CartLink cartCount={cartCount} />
        </nav>
      </div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: drawerOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 transform ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6">
          <button
            className="text-xl font-bold text-red-500"
            onClick={toggleDrawer}
          >
            <IoClose className="size-7" />
          </button>
          <div className="mt-6 space-y-4">
            <NavLink href="/" label="Home" onClick={toggleDrawer} />
            <NavLink href="/products" label="Products" onClick={toggleDrawer} />
            <CartLink cartCount={cartCount} onClick={toggleDrawer} />
          </div>
        </div>
      </motion.div>

      {drawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-40"
          onClick={toggleDrawer}
        />
      )}
    </header>
  );
}

function NavLink({ href, label, onClick }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <motion.div
        className="text-lg text-black relative cursor-pointer my-2 md:my-0"
        whileHover={{ color: "#22c55e" }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
      >
        {label}
        <motion.span
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}

function CartLink({ cartCount, onClick }: CartLinkProps) {
  return (
    <Link href="/cart" passHref>
      <motion.div
        className="text-lg text-black relative flex items-center cursor-pointer my-2 md:my-0"
        whileHover={{ color: "#22c55e" }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
      >
        Cart
        {cartCount > 0 && (
          <motion.span
            className="ml-2 flex items-center justify-center bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {cartCount}
          </motion.span>
        )}
        <motion.span
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}
