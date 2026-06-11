import React from 'react';

const Loader = ({
  message = 'Loading...',
  fullScreen = false,
  size = 'md', // sm, md, lg
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-md p-lg">
      <div className="relative flex items-center justify-center">
        {/* Dashed outer spinner */}
        <div className={`animate-spin rounded-full border-t-primary border-r-transparent border-b-transparent border-l-transparent border-dashed ${sizeClasses[size]} border-slate-200`}></div>
      </div>
      {message && (
        <p className="text-sm font-semibold text-slate-500 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
