import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "./components";
import ActionPanel from "./components/ActionPanel";
import "./globals.css";
import Provider from "./utils/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedRemind",
  description: "Created by MedRemind Team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} h-screen`}>
          <Provider>
            <main className="text-primary font-medium text-small flex w-full">
              <div className="w-[250px]">
                <ActionPanel />
              </div>
              <div className="flex-1 p-2">{children}</div>
            </main>
          </Provider>
        </body>
      </UserProvider>
    </html>
  );
}
