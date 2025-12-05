import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-black/30 to-transparent py-4 relative">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-primary font-semibold">CryptoConverter</div>
            <div className="text-xs text-muted">Fast · Minimal</div>
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
