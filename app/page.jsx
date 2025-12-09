import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";

export default function Home() {
return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Хялбар Түрээс платформ
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Богино болон дунд хугацааны байр түрээсийг онлайнаар хялбар, найдвартай зохион байгуулах систем.
          </p>
          <a 
            href="/search" 
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg hover:shadow-xl"
          >
            
            <span>Байр хайх</span>
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Яагаад биднийг сонгох вэ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
             
              </div>
              <h3 className="text-xl font-semibold mb-3">Хялбар хайлт</h3>
              <p className="text-gray-600">
                Хүссэн газраа хялбараар олж, шуурхай захиалга өгөх боломжтой
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                
              </div>
              <h3 className="text-xl font-semibold mb-3">Найдвартай</h3>
              <p className="text-gray-600">
                Баталгаажсан эзэмшигчид болон тохь байрууд
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              
              </div>
              <h3 className="text-xl font-semibold mb-3">Уян хатан</h3>
              <p className="text-gray-600">
                Богино болон урт хугацааны түрээсийн сонголт
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}