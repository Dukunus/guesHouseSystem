import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ApartmentProvider } from "@/context/ApartmentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Хялбар Түрээс",
  description: "Богино болон дунд хугацааны байр түрээсийн платформ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body className="bg-gray-100 w-full h-screen ">
        <AuthProvider>
          <ApartmentProvider>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-6">

            {children}
            </div>
            <Footer/>
          </ApartmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
