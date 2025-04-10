// app/layout.jsx
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientOnly from "./ClientOnly";


export const metadata = {
  title: "Admin Dashboard",
  description: "User management admin dashboard built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark">
          <ClientOnly>{children}</ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}
