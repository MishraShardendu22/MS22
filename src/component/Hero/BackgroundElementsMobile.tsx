/**
 * Mobile-optimized background - no animated blurs, minimal DOM
 */
export const BackgroundElementsMobile = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gray-950/30" />
    </div>
  );
};
