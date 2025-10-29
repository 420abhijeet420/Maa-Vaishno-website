import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-6">
          <img
            alt="Maa Vaishno Logo"
            className="h-11"
            src={assets.logo} // replace with your logo
          />
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
          Devotion, faith, and blessings from Maa Vaishno. May her divine energy guide and protect you always.
        </p>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
          Maa Vaishno ©2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
