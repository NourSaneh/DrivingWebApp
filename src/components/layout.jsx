import React from "react";
import LebanonFlag from "../assets/lebanon-flag.png";

export default function Layout({ children, onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-sans relative">

      {/* LANGUAGE BUTTON */}
      <div className="absolute top-4 left-4 flex items-center gap-3 z-20">
        <select className="px-2 py-1.5 rounded-md border bg-white shadow text-xs font-medium w-20">
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="ar">AR</option>
        </select>
      </div>

      {/* LOGIN BTN */}
      <div className="absolute top-4 right-4 z-20">
<button
  onClick={() => onNavigate("login")}
  className="px-7 py-2.5 bg-[#ED1C24] hover:bg-[#c21820] 
             text-white rounded-lg font-semibold shadow text-sm"
>
          Login
        </button>
      </div>


      {/* DARK OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-black/30"></div>

      {/* MAIN CARD */}
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <header className="bg-gradient-to-r from-[#ED1C24] to-[#c21820] text-white py-6 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 heading">
            Driver Mastery
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Master Every Rule. Pass With Confidence.
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

        {/* PAGE CONTENT */}
        <main className="p-5 md:p-6">{children}</main>

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
