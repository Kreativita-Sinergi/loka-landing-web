"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import { FaGooglePlay, FaWindows } from "react-icons/fa";
import { ChevronDown, Download, UserPlus } from "lucide-react";

import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { getMenuItems } from "@/data/menuItems";
import { siteDetails } from "@/data/siteDetails";
import { getAppDownload, getSignUp } from "@/data/cta";
import { localePath, type Locale } from "@/data/localized";
import { getUi } from "@/data/ui";
import { trackDownloadClick, trackSignUpClick } from "@/utils/analytics";

const Header: React.FC<{ locale: Locale }> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuItems = getMenuItems(locale);
  const signUpDetails = getSignUp(locale);
  const appDownloadDetails = getAppDownload(locale);
  const ui = getUi(locale);

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
          <Link href={localePath(locale)} className="flex items-center gap-2">
            <Image src="/images/logo.png" width={130} height={70} alt="Loka Kasir" priority />
          </Link>
          <ul className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="block whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-900 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-all dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Link
                href={signUpDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSignUpClick("header-register")}
                title={ui.navSignUpTitle}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
              >
                <UserPlus size={15} aria-hidden="true" className="relative -top-px" /> {ui.navSignUp}
              </Link>
            </li>
            <li className="ml-1">
              <Link
                href={siteDetails.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
              >
                {ui.navLogin}
              </Link>
            </li>
            {/* Satu tombol untuk semua platform — dropdown supaya nav tidak sesak */}
            <li className="ml-1">
              <Menu as="div" className="relative">
                <MenuButton className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm">
                  <Download size={16} aria-hidden="true" className="relative -top-px" />
                  {ui.navDownloadApp}
                  <ChevronDown size={14} aria-hidden="true" className="relative -top-px" />
                </MenuButton>
                <MenuItems
                  anchor="bottom end"
                  className="z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg focus:outline-none dark:border-surface-border dark:bg-surface"
                >
                  <MenuItem>
                    <a
                      href={appDownloadDetails.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackDownloadClick("header")}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left data-[focus]:bg-gray-50 dark:data-[focus]:bg-white/5"
                    >
                      <FaGooglePlay size={16} className="flex-shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <span>
                        <span className="block text-sm font-semibold text-gray-900 dark:text-white">Android</span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">{ui.navAndroidNote}</span>
                      </span>
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href={localePath(locale, "/download/windows")}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left data-[focus]:bg-gray-50 dark:data-[focus]:bg-white/5"
                    >
                      <FaWindows size={16} className="flex-shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <span>
                        <span className="block text-sm font-semibold text-gray-900 dark:text-white">Windows</span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">{ui.navWindowsNote}</span>
                      </span>
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </li>
            <li className="ml-1">
              <LanguageSwitcher locale={locale} />
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
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
              <span className="sr-only">{ui.navToggle}</span>
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
                href={signUpDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackSignUpClick("header-mobile-register");
                  toggleMenu();
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400"
              >
                <UserPlus size={16} aria-hidden="true" className="relative -top-px" /> {ui.navSignUpFree}
              </Link>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {ui.navSignUpHint}
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
                {ui.navLoginAdmin}
              </Link>
            </li>
            <li>
              <Link
                href={appDownloadDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white bg-[#007BFF] hover:bg-blue-600 px-5 py-2 rounded-full w-fit"
                onClick={() => {
                  trackDownloadClick("header-mobile");
                  toggleMenu();
                }}
              >
                <Download size={16} aria-hidden="true" className="relative -top-px" /> {ui.navDownloadApp}
              </Link>
            </li>
            <li>
              <Link
                href={localePath(locale, "/download/windows")}
                onClick={toggleMenu}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#007BFF] dark:text-gray-300 dark:hover:text-[#4d8dff]"
              >
                <FaWindows size={14} aria-hidden="true" /> {ui.navWindowsLink}
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
