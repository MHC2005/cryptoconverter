import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-black/30 to-transparent py-4">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 8H9L12 2Z" fill="white" opacity="0.95" />
            </svg>
          </div>
          <div>
            <div className="text-primary font-semibold">CryptoConverter</div>
            <div className="text-xs text-muted">Fast · Secure · Minimal</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a className="hover:text-primary transition" href="#">Markets</a>
          <a className="hover:text-primary transition" href="#">Convert</a>
          <a className="hover:text-primary transition" href="#">Docs</a>
          <button className="ml-2 px-3 py-1 rounded-md bg-white/6 text-white hover:bg-white/10 transition">Connect</button>
        </nav>
      </div>
    </header>
  );
}
