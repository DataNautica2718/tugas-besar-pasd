import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopAppBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isLinkActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tentang', label: 'Tentang' },
  ];

  return (
    <>
      {/* Sticky Navbar */}
      <header
        className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? 'shadow-sm border-b border-slate-100' : 'border-b border-transparent'
        }`}
        style={{ height: '72px' }}
      >
        <div className="max-w-[1200px] mx-auto px-8 md:px-12 h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            id="navbar-logo"
            className="font-extrabold text-xl text-primary tracking-tight flex-shrink-0 hover:opacity-90 transition-opacity"
          >
            FoodyMoody
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative inline-flex flex-col items-center font-semibold text-sm transition-colors duration-200 pb-[3px] ${
                  isLinkActive(to)
                    ? 'text-primary'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {label}
                {/* Active indicator: 4px below text, matches text width */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                    isLinkActive(to) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                  style={{ transformOrigin: 'center' }}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            id="navbar-hamburger-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg hover:bg-slate-100 transition-colors p-2"
          >
            <span className={`block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-[72px] right-0 z-40 h-[calc(100vh-72px)] w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1 p-5 pt-4">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                isLinkActive(to)
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default TopAppBar;
