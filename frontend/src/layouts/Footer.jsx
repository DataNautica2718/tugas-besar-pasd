import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-xl mt-auto bg-white border-t border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto gap-md w-full">
        <div className="flex flex-col gap-xs items-center md:items-start text-center md:text-left">
          <div className="font-extrabold text-lg text-primary">FoodyMoody</div>
          <p className="text-xs text-slate-400">
            © 2026 FoodyMoody. Functional Warmth for your Kitchen.
          </p>
        </div>
        <div className="flex gap-xl text-slate-500">
          <a href="#" className="text-xs font-semibold hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs font-semibold hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-xs font-semibold hover:text-primary transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
