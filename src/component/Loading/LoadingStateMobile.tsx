export const LoadingStateMobile = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 gap-4">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  );
};

export const NameLoaderMobile = () => {
  return (
    <div className="flex items-center justify-center w-full py-4">
      <p className="text-lg font-semibold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        Shardendu Mishra
      </p>
    </div>
  );
};
