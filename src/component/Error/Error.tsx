"use client";

import { animate, svg } from "animejs";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Teko } from "next/font/google";
import Link from "next/link";
import { useEffect, useRef } from "react";

const teko = Teko({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: false,
});

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!dotRef.current || !pathRef.current) return;

    // Animate the dot along the motion path
    animate(dotRef.current, {
      ease: "linear",
      duration: 6000,
      loop: true,
      ...svg.createMotionPath(pathRef.current),
    });

    // Animate the path drawing
    animate(svg.createDrawable(pathRef.current), {
      draw: "0 1",
      ease: "linear",
      duration: 6000,
      loop: true,
    });
  }, []);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-linear-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="relative w-full max-w-4xl px-8 z-10">
        {/* Alert Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center ring-2 ring-red-500/30">
              <AlertTriangle className="w-12 h-12 text-red-400" />
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-2xl bg-red-500/20 animate-ping"></div>
          </div>
        </div>

        {/* ERROR SVG */}
        <div className="relative mb-12">
          <svg
            viewBox="0 0 190.8 72.001"
            className="w-full h-auto max-w-2xl mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="errorGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <filter id="errorGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              ref={pathRef}
              d="M 0 71.001 L 0 1.001 L 30 1.001 L 30 11.001 L 11 11.001 L 11 29.501 L 26.1 29.501 L 26.1 39.501 L 11 39.501 L 11 61.001 L 30 61.001 L 30 71.001 L 0 71.001 Z M 36.3 71.001 L 36.3 1.001 L 52.6 1.001 Q 61.1 1.001 65 4.951 Q 68.9 8.901 68.9 17.101 L 68.9 21.401 Q 68.9 32.301 61.7 35.201 L 61.7 35.401 Q 65.7 36.601 67.35 40.301 Q 69 44.001 69 50.201 L 69 62.501 Q 69 65.501 69.2 67.351 Q 69.4 69.201 70.2 71.001 L 59 71.001 Q 58.4 69.301 58.2 67.801 Q 58 66.301 58 62.401 L 58 49.601 Q 58 44.801 56.45 42.901 Q 54.9 41.001 51.1 41.001 L 47.3 41.001 L 47.3 71.001 L 36.3 71.001 Z M 76.6 71.001 L 76.6 1.001 L 92.9 1.001 Q 101.4 1.001 105.3 4.951 Q 109.2 8.901 109.2 17.101 L 109.2 21.401 Q 109.2 32.301 102 35.201 L 102 35.401 Q 106 36.601 107.65 40.301 Q 109.3 44.001 109.3 50.201 L 109.3 62.501 Q 109.3 65.501 109.5 67.351 Q 109.7 69.201 110.5 71.001 L 99.3 71.001 Q 98.7 69.301 98.5 67.801 Q 98.3 66.301 98.3 62.401 L 98.3 49.601 Q 98.3 44.801 96.75 42.901 Q 95.2 41.001 91.4 41.001 L 87.6 41.001 L 87.6 71.001 L 76.6 71.001 Z M 156.9 71.001 L 156.9 1.001 L 173.2 1.001 Q 181.7 1.001 185.6 4.951 Q 189.5 8.901 189.5 17.101 L 189.5 21.401 Q 189.5 32.301 182.3 35.201 L 182.3 35.401 Q 186.3 36.601 187.95 40.301 Q 189.6 44.001 189.6 50.201 L 189.6 62.501 Q 189.6 65.501 189.8 67.351 Q 190 69.201 190.8 71.001 L 179.6 71.001 Q 179 69.301 178.8 67.801 Q 178.6 66.301 178.6 62.401 L 178.6 49.601 Q 178.6 44.801 177.05 42.901 Q 175.5 41.001 171.7 41.001 L 167.9 41.001 L 167.9 71.001 L 156.9 71.001 Z M 116.1 54.401 L 116.1 17.601 Q 116.1 9.201 120.4 4.601 Q 124.7 0.001 132.8 0.001 Q 140.9 0.001 145.2 4.601 Q 149.5 9.201 149.5 17.601 L 149.5 54.401 Q 149.5 62.801 145.2 67.401 Q 140.9 72.001 132.8 72.001 Q 124.7 72.001 120.4 67.401 Q 116.1 62.801 116.1 54.401 Z M 138.5 55.101 L 138.5 16.901 Q 138.5 10.001 132.8 10.001 Q 127.1 10.001 127.1 16.901 L 127.1 55.101 Q 127.1 62.001 132.8 62.001 Q 138.5 62.001 138.5 55.101 Z M 47.3 31.001 L 51.3 31.001 Q 54.6 31.001 56.25 29.301 Q 57.9 27.601 57.9 23.601 L 57.9 18.201 Q 57.9 14.401 56.55 12.701 Q 55.2 11.001 52.3 11.001 L 47.3 11.001 L 47.3 31.001 Z M 87.6 31.001 L 91.6 31.001 Q 94.9 31.001 96.55 29.301 Q 98.2 27.601 98.2 23.601 L 98.2 18.201 Q 98.2 14.401 96.85 12.701 Q 95.5 11.001 92.6 11.001 L 87.6 11.001 L 87.6 31.001 Z M 167.9 31.001 L 171.9 31.001 Q 175.2 31.001 176.85 29.301 Q 178.5 27.601 178.5 23.601 L 178.5 18.201 Q 178.5 14.401 177.15 12.701 Q 175.8 11.001 172.9 11.001 L 167.9 11.001 L 167.9 31.001 Z"
              fill="none"
              stroke="url(#errorGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#errorGlow)"
              opacity="0.8"
            />
          </svg>

          {/* Animated glowing dot */}
          <div
            ref={dotRef}
            className="absolute w-6 h-6 rounded-full"
            style={{
              left: "-12px",
              top: "-12px",
              background:
                "radial-gradient(circle, #ef4444 0%, #f97316 50%, #fbbf24 100%)",
              boxShadow: "0 0 20px #ef4444, 0 0 40px #f97316, 0 0 60px #fbbf24",
            }}
          >
            <div className="absolute inset-1 rounded-full bg-white opacity-60 animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-12">
          <h1
            className={`${teko.className} text-4xl md:text-5xl font-bold mb-4 text-white`}
          >
            Something Went Wrong
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            We encountered an unexpected error.
          </p>
          {error && (
            <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-950/20 border border-red-900/30 rounded-lg">
              <p className="text-red-400 text-sm font-mono break-all">
                {error.message || "An unknown error occurred"}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {reset && (
            <button
              type="button"
              onClick={reset}
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Try Again</span>
            </button>
          )}

          <Link
            href="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-orange-500/30 text-gray-300 hover:text-orange-400 font-semibold text-lg transition-all hover:scale-105"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Go Home</span>
          </Link>
        </div>

        {/* Error Code */}
        <div className={`${teko.className} text-center mt-12`}>
          <p className="text-gray-600 text-sm tracking-widest uppercase">
            Error {error ? "Runtime" : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
