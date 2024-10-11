"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaHome, FaBook, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const logoPath = "/images/panoramix.png";

  return (
    <footer className="text-gray-600 body-font bg-black dark:bg-black">
      <div className="container px-5 py-6 mx-auto flex flex-col sm:flex-row items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex title-font font-medium items-center text-gray-900 dark:text-gray-100 mb-4 sm:mb-0">
          <Link href="/">
            <Image
              width={90}
              height={90}
              src={logoPath}
              alt="Logo"
              className="cursor-pointer rounded-lg"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center mt-3 sm:mt-0 space-x-3 sm:space-x-6">
          <Link href="/" className="mx-2 text-white hover:text-blue-500 flex items-center">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link href="/note" className="mx-2 text-white hover:text-green-500 flex items-center">
            <FaBook className="mr-2" /> iNote
          </Link>
          <Link href="/contact" className="mx-2 text-white hover:text-[#8B4513] flex items-center">
            <FaEnvelope className="mr-2" /> Contact
          </Link>
        </div>

        {/* Social Icons Section */}
        <span className="inline-flex mt-4 sm:mt-0 justify-center space-x-3 sm:space-x-5">
          <a href="https://facebook.com" className="text-blue-600 dark:text-blue-600 hover:text-blue-800">
            <FaFacebook className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" className="text-blue-400 dark:text-blue-400 hover:text-blue-600">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" className="text-pink-500 dark:text-pink-500 hover:text-pink-700">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" className="text-blue-700 dark:text-blue-700 hover:text-blue-900">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com" className="text-gray-500 dark:text-gray-500 hover:text-gray-700">
            <FaGithub className="w-5 h-5" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
