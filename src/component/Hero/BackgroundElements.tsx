export const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none will-change-auto">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-80 md:h-80 bg-cyan-500/5 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-80 md:h-80 bg-blue-500/5 rounded-full blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f06_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f06_1px,transparent_1px)] bg-size-[4rem_4rem]" />
    </div>
  );
};
