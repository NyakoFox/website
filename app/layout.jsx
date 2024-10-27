import "./globals.css";
import Taskbar from "@/components/Taskbar";

export const metadata = {
  title: "Nyako",
  description: "my website! who am i?",
  metadataBase: "https://nyako.gay/",
  image: "/pfps/selene.png",
  openGraph: {
    title: "Nyako",
    description: "my website! who am i?",
    type: "website",
    url: "https://nyako.gay/",
    site_name: "Nyako",
    locale: "en_US",
    images: [
        {
            url: "/pfps/selene.png",
            width: 512,
            height: 512,
            alt: "Nyako's pfp",
        },
    ],
  },
  twitter: {
      card: "summary",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Taskbar/>
      </body>
    </html>
  );
}
