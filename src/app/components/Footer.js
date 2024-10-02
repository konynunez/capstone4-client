"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto text-center w-full">
      <div className="container mx-auto">
        {/* Navigation Links */}
        <ul className="flex justify-center space-x-6">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/todo" className="hover:underline">
              Todo
            </a>
          </li>
        </ul>
        <p className="mt-4">© 2024 Panoramix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
