import React from 'react';

const Input = ({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-xs ${className}`}>
      {label && (
        <label htmlFor={id} className="block font-bold text-sm text-slate-700">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full h-12 bg-white border ${
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'
          } rounded-xl outline-none focus:ring-4 text-sm font-medium transition-all ${
            icon ? 'pl-11 pr-md' : 'px-md'
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-400 font-medium">{helperText}</p>}
    </div>
  );
};

export default Input;
