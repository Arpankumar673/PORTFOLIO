import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center p-6 text-center">
       <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-b-2 border-secondary rounded-full animate-spin duration-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
       </div>
       <h1 className="text-xl font-black uppercase tracking-[0.3em] gradient-text animate-pulse">Loading Assets</h1>
    </div>
  );
};

export default Loading;
