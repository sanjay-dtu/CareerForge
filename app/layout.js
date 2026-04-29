import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark, shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CareerForge",
  description: "AI Career Coach",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning className="dark">
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            {/* Modern Creative Footer */}
            <footer className="relative bg-muted/50 py-12 overflow-hidden">
              {/* Animated gradient orbs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="container mx-auto px-4 text-center relative z-10">
                {/* Main text with gradient */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <p className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    CareerForge
                  </p>
                </div>

                {/* Creator credit */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-gray-400">
                  <span>Designed & Developed by</span>
                  <span className="group cursor-default font-medium text-white">
                    <span className="inline-block transition-transform group-hover:scale-110 group-hover:text-cyan-400">
                      Sanjay Kumar
                    </span>
                  </span>
                </div>

                {/* Decorative line */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                  <span className="text-xl">💜</span>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}