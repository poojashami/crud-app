import "./globals.css";

export const metadata = {
  title: "CRUD App",
  description: "Next.js + Express + MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          {/* <a href="/" className="text-xl font-bold">
            CRUD App
          </a> */}
        </nav>
        {children}
      </body>
    </html>
  );
}
