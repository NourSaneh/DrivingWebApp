import React from "react";
import LebanonFlag from "../assets/lebanon-flag.png";
import bg from "../../assets/background-cars.jpg";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-sans relative">

      {/* Background Layer */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/30"></div>

      {/* CARD BOX */}
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <header className="bg-gradient-to-r from-[#ED1C24] to-[#c21820] text-white py-6 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 heading">
            DARESNE
          </h1>

          <p className="text-xl md:text-2xl opacity-90">
            Lebanese Driving Exam Guide
          </p>

          <nav className="mt-4 flex justify-center space-x-4">
            <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">
              Traffic Signs
            </span>
            <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">
              Traffic Questions
            </span>
            <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">
              Test Simulator
            </span>
            <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">
              Car Parts
            </span>
          </nav>
        </header>

        {/* MAIN */}
        <main className="p-5 md:p-6">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-4 px-6 text-center">
          <div className="flex justify-between items-center">
            
            <div>
              <h3 className="font-bold text-lg heading">Credits</h3>
              <p className="text-gray-300">Nour Saneh</p>
            </div>

            <div className="flex items-center">
              <img
                src={LebanonFlag}
                alt="Lebanon flag"
                className="w-6 h-4 object-cover rounded-sm shadow-sm"
              />
              <span className="ml-2 font-medium">LEBANON</span>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
}
