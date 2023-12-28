import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter } from "next/font/google";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import { SnackBarContextProvider } from "@/common/snackBarContext/snackBarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React CRUD boilerplate",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <AppRouterCacheProvider>
          <SnackBarContextProvider>{children}</SnackBarContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
