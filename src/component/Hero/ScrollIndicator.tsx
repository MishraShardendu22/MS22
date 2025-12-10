import { ChevronDown } from "lucide-react";

export const ScrollIndicator = () => {
  return (
    <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-cyan-400/60 hover:text-cyan-400 transition-colors cursor-pointer">
      <span className="text-xs font-medium uppercase tracking-wider">
        Scroll
      </span>
      <ChevronDown className="w-5 h-5" />
    </div>
  );
};
