import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, outline, danger, ghost
  size = 'md', // sm, md, lg
  disabled = false,
  isLoading = false,
  className = '',
  icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all active:scale-[0.98] outline-none rounded-xl disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary hover:bg-[#003594] text-white shadow-md shadow-primary/10',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200',
    outline: 'border border-primary text-primary hover:bg-primary/5',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/10',
    ghost: 'hover:bg-slate-100 text-slate-600'
  };

  const sizes = {
    sm: 'px-sm py-1.5 text-xs',
    md: 'px-lg py-sm text-sm',
    lg: 'px-2xl py-md text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin mr-xs text-[18px]">
          progress_activity
        </span>
      ) : icon ? (
        <span className="material-symbols-outlined mr-xs text-[18px]">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
