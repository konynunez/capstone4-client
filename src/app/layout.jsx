import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Notebook App",
  description: "A simple notebook app using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags, favicons, etc. */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add other head elements as needed */}
      </head>
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
        {/* Navbar with dark mode toggle */}
        <Navbar />

        {/* Main content */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>

        {/* Footer with navigation links */}
        <Footer />
      </body>
    </html>
  );
}
