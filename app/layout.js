import "./globals.css";

export const metadata = {
  title: "Nyako",
  description: "hi!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
