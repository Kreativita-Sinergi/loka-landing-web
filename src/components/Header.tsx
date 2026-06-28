"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import { MessageCircle, UserPlus } from "lucide-react";

import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { menuItems } from "@/data/menuItems";
import { siteDetails } from "@/data/siteDetails";
import { appRequestDetails, registerDetails } from "@/data/cta";
import { trackContactClick } from "@/utils/analytics";

const appRequestWaLink = `https://wa.me/${appRequestDetails.whatsapp}?text=${encodeURIComponent(
  appRequestDetails.whatsappMessage
)}`;

// Tautan pendaftaran: arahkan langsung ke WhatsApp atau Instagram admin.
const registerWaLink = `https://wa.me/${registerDetails.whatsapp}?text=${encodeURIComponent(
  registerDetails.whatsappMessage
)}`;

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
            <Image src="/images/logo.png" width={130} height={70} alt="Loka Kasir" priority />
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
                href={registerWaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("whatsapp", "header-register")}
                title="Daftar dengan meminta aplikasi via WhatsApp — akun dibuat di dalam aplikasi"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
              >
                <UserPlus size={15} aria-hidden="true" className="relative -top-px" /> Daftar
              </Link>
            </li>
            <li className="ml-1">
              <Link
                href={siteDetails.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
              >
                Login
              </Link>
            </li>
            <li className="ml-1">
              <Link
                href={appRequestWaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("whatsapp", "header")}
                className="inline-flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm"
              >
                <MessageCircle size={16} aria-hidden="true" className="relative -top-px" /> Minta Aplikasi
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
            <li className="pt-2 border-t border-gray-100 dark:border-surface-border">
              <Link
                href={registerWaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackContactClick("whatsapp", "header-mobile-register");
                  toggleMenu();
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400"
              >
                <UserPlus size={16} aria-hidden="true" className="relative -top-px" /> Daftar via WhatsApp
              </Link>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Minta aplikasinya dulu, lalu daftar akun di dalam aplikasi.
              </p>
            </li>
            <li>
              <Link
                href={siteDetails.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#007BFF] block py-2 dark:text-gray-200 dark:hover:text-[#4d8dff]"
                onClick={toggleMenu}
              >
                Login Admin
              </Link>
            </li>
            <li>
              <Link
                href={appRequestWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white bg-[#007BFF] hover:bg-blue-600 px-5 py-2 rounded-full w-fit"
                onClick={() => {
                  trackContactClick("whatsapp", "header-mobile");
                  toggleMenu();
                }}
              >
                <MessageCircle size={16} aria-hidden="true" className="relative -top-px" /> Minta Aplikasi
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
