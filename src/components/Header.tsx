"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";

import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { menuItems } from "@/data/menuItems";
import { siteDetails } from "@/data/siteDetails";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 dark:bg-background ${
        scrolled ? "bg-white shadow-md dark:shadow-black/40" : "bg-white"
      }`}
    >
      <Container className="!px-0">
        <nav className="mx-auto flex justify-between items-center py-3 px-5 md:py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" width={130} height={70} alt="Logo" />
          </Link>
          <ul className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Link
                href={siteDetails.dashboardUrl}
                target="_blank"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
              >
                Login
              </Link>
            </li>
            <li className="ml-1">
              <Link
                href="#cta"
                className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm"
              >
                Download
              </Link>
            </li>
            <li className="ml-1">
              <ThemeToggle />
            </li>
          </ul>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-[#007BFF] text-white focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </Container>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg dark:bg-background dark:border-t dark:border-surface-border">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-black hover:text-[#007BFF] block dark:text-gray-200 dark:hover:text-[#4d8dff]"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={siteDetails.dashboardUrl}
                target="_blank"
                className="text-black hover:text-[#007BFF] block py-2 dark:text-gray-200 dark:hover:text-[#4d8dff]"
                onClick={toggleMenu}
              >
                Login Admin
              </Link>
            </li>
            <li>
              <Link
                href="#cta"
                className="text-white bg-[#007BFF] hover:bg-blue-600 px-5 py-2 rounded-full block w-fit"
                onClick={toggleMenu}
              >
                Download
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
