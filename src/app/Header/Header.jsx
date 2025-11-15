import BannerNav from "./BannerNav";
import TopBar from "./TopBar";

export default function Header({ className }) {
  return (
    <header className={`relative font-sans ${className}`}>
      {/* Camo background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/header_bg.jpg')] bg-cover bg-center"
        aria-hidden="true"
      />

      {/* Dark overlay for readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-black/90"
        aria-hidden="true"
      />

      {/* Actual header content */}
      <div className="relative">
        <TopBar />
        <BannerNav />
      </div>
    </header>
  );
}
