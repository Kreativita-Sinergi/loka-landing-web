"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import { FaInstagram } from "react-icons/fa";
import { MessageCircle, UserPlus, ChevronDown } from "lucide-react";

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
const registerIgLink = `https://ig.me/m/${registerDetails.instagram}`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const registerRef = useRef<HTMLLIElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup dropdown "Daftar" saat mengklik di luar area dropdown.
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (registerRef.current && !registerRef.current.contains(e.target as Node)) {
        setRegisterOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
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
            <li ref={registerRef} className="relative ml-2">
              <button
                type="button"
                onClick={() => setRegisterOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={registerOpen}
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
              >
                <UserPlus size={15} aria-hidden="true" /> Daftar
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform ${registerOpen ? "rotate-180" : ""}`}
                />
              </button>
              <Transition
                show={registerOpen}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <div className="absolute right-0 mt-2 w-60 rounded-xl border border-gray-100 bg-white shadow-lg p-2 z-50 dark:bg-background dark:border-surface-border">
                  <p className="px-3 pt-1 pb-2 text-xs text-gray-400 dark:text-gray-500">
                    Mulai daftar lewat:
                  </p>
                  <a
                    href={registerWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackContactClick("whatsapp", "header-register");
                      setRegisterOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-200 dark:hover:bg-green-500/10"
                  >
                    <MessageCircle size={18} className="text-green-600" aria-hidden="true" />
                    Daftar via WhatsApp
                  </a>
                  <a
                    href={registerIgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackContactClick("instagram", "header-register");
                      setRegisterOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-colors dark:text-gray-200 dark:hover:bg-pink-500/10"
                  >
                    <FaInstagram size={18} className="text-pink-600" aria-hidden="true" />
                    Daftar via Instagram
                  </a>
                </div>
              </Transition>
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
                <MessageCircle size={16} aria-hidden="true" /> Minta Aplikasi
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
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Daftar lewat:</p>
              <div className="flex flex-col gap-2">
                <a
                  href={registerWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackContactClick("whatsapp", "header-mobile-register");
                    toggleMenu();
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400"
                >
                  <MessageCircle size={16} aria-hidden="true" /> Daftar via WhatsApp
                </a>
                <a
                  href={registerIgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackContactClick("instagram", "header-mobile-register");
                    toggleMenu();
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-pink-700 dark:text-pink-400"
                >
                  <FaInstagram size={16} aria-hidden="true" /> Daftar via Instagram
                </a>
              </div>
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
                <MessageCircle size={16} aria-hidden="true" /> Minta Aplikasi
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
