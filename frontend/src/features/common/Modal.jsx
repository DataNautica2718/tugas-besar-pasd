import React, { useEffect } from 'react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // sm, md, lg, xl
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md overflow-x-hidden overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div
        className={`relative bg-white w-full ${sizes[size]} rounded-2xl shadow-xl border border-slate-100 flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-lg border-b border-slate-100">
          <h3 className="font-extrabold text-lg text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center p-1 rounded-lg hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-[20px] font-bold">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-lg overflow-y-auto flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
