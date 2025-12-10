"use client";

import { animate, svg } from "animejs";
import { ArrowLeft, Home } from "lucide-react";
import { Teko } from "next/font/google";
import Link from "next/link";
import { useEffect, useRef } from "react";

const teko = Teko({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: false,
});

export default function NotFound() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!dotRef.current || !pathRef.current) return;

    // Animate the dot along the motion path
    animate(dotRef.current, {
      ease: "linear",
      duration: 10000,
      loop: true,
      ...svg.createMotionPath(pathRef.current),
    });

    // Animate the path drawing
    animate(svg.createDrawable(pathRef.current), {
      draw: "0 1",
      ease: "linear",
      duration: 10000,
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

      <div className="relative w-full max-w-5xl px-8 z-10">
        {/* 404 Number */}
        <div className={`${teko.className} text-center mb-8`}>
          <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none">
            <span className="text-transparent bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text drop-shadow-[0_0_30px_rgba(255,107,0,0.8)]">
              404
            </span>
          </h1>
        </div>

        {/* Page Not Found SVG */}
        <div className="relative mb-12">
          <svg
            viewBox="0 0 491.601 72.001"
            className="w-full h-auto max-w-3xl mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="notFoundGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <filter id="notFoundGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              ref={pathRef}
              d="M 166.4 71.001 L 166.4 1.001 L 180.2 1.001 L 190.9 42.901 L 191.1 42.901 L 191.1 1.001 L 200.9 1.001 L 200.9 71.001 L 189.6 71.001 L 176.4 19.901 L 176.2 19.901 L 176.2 71.001 L 166.4 71.001 Z M 415.7 71.001 L 415.7 1.001 L 429.5 1.001 L 440.2 42.901 L 440.4 42.901 L 440.4 1.001 L 450.2 1.001 L 450.2 71.001 L 438.9 71.001 L 425.7 19.901 L 425.5 19.901 L 425.5 71.001 L 415.7 71.001 Z M 74.2 54.401 L 74.2 17.601 Q 74.2 9.101 78.4 4.551 Q 82.6 0.001 90.6 0.001 Q 98.6 0.001 102.8 4.551 Q 107 9.101 107 17.601 L 107 23.601 L 96.6 23.601 L 96.6 16.901 Q 96.6 10.001 90.9 10.001 Q 85.2 10.001 85.2 16.901 L 85.2 55.201 Q 85.2 62.001 90.9 62.001 Q 96.6 62.001 96.6 55.201 L 96.6 41.501 L 91.1 41.501 L 91.1 31.501 L 107 31.501 L 107 54.401 Q 107 62.901 102.8 67.451 Q 98.6 72.001 90.6 72.001 Q 82.6 72.001 78.4 67.451 Q 74.2 62.901 74.2 54.401 Z M 375.1 54.401 L 375.1 1.001 L 386.1 1.001 L 386.1 55.201 Q 386.1 58.801 387.55 60.401 Q 389 62.001 391.7 62.001 Q 394.4 62.001 395.85 60.401 Q 397.3 58.801 397.3 55.201 L 397.3 1.001 L 407.9 1.001 L 407.9 54.401 Q 407.9 62.901 403.7 67.451 Q 399.5 72.001 391.5 72.001 Q 383.5 72.001 379.3 67.451 Q 375.1 62.901 375.1 54.401 Z M 114.1 71.001 L 114.1 1.001 L 144.1 1.001 L 144.1 11.001 L 125.1 11.001 L 125.1 29.501 L 140.2 29.501 L 140.2 39.501 L 125.1 39.501 L 125.1 61.001 L 144.1 61.001 L 144.1 71.001 L 114.1 71.001 Z M 301.1 71.001 L 301.1 1.001 L 330.2 1.001 L 330.2 11.001 L 312.1 11.001 L 312.1 30.501 L 326.3 30.501 L 326.3 40.501 L 312.1 40.501 L 312.1 71.001 L 301.1 71.001 Z M 32.2 71.001 L 43.6 1.001 L 58.5 1.001 L 69.9 71.001 L 58.9 71.001 L 56.9 57.101 L 56.9 57.301 L 44.4 57.301 L 42.4 71.001 L 32.2 71.001 Z M 257.3 71.001 L 257.3 11.001 L 245.8 11.001 L 245.8 1.001 L 279.8 1.001 L 279.8 11.001 L 268.3 11.001 L 268.3 71.001 L 257.3 71.001 Z M 458.4 71.001 L 458.4 1.001 L 475.2 1.001 Q 483.4 1.001 487.5 5.401 Q 491.6 9.801 491.6 18.301 L 491.6 53.701 Q 491.6 62.201 487.5 66.601 Q 483.4 71.001 475.2 71.001 L 458.4 71.001 Z M 0 71.001 L 0 1.001 L 16.2 1.001 Q 24.4 1.001 28.5 5.401 Q 32.6 9.801 32.6 18.301 L 32.6 25.201 Q 32.6 33.701 28.5 38.101 Q 24.4 42.501 16.2 42.501 L 11 42.501 L 11 71.001 L 0 71.001 Z M 208.3 54.401 L 208.3 17.601 Q 208.3 9.201 212.6 4.601 Q 216.9 0.001 225 0.001 Q 233.1 0.001 237.4 4.601 Q 241.7 9.201 241.7 17.601 L 241.7 54.401 Q 241.7 62.801 237.4 67.401 Q 233.1 72.001 225 72.001 Q 216.9 72.001 212.6 67.401 Q 208.3 62.801 208.3 54.401 Z M 334.7 54.401 L 334.7 17.601 Q 334.7 9.201 339 4.601 Q 343.3 0.001 351.4 0.001 Q 359.5 0.001 363.8 4.601 Q 368.1 9.201 368.1 17.601 L 368.1 54.401 Q 368.1 62.801 363.8 67.401 Q 359.5 72.001 351.4 72.001 Q 343.3 72.001 339 67.401 Q 334.7 62.801 334.7 54.401 Z M 469.4 61.001 L 475 61.001 Q 477.7 61.001 479.15 59.401 Q 480.6 57.801 480.6 54.201 L 480.6 17.801 Q 480.6 14.201 479.15 12.601 Q 477.7 11.001 475 11.001 L 469.4 11.001 L 469.4 61.001 Z M 230.7 55.101 L 230.7 16.901 Q 230.7 10.001 225 10.001 Q 219.3 10.001 219.3 16.901 L 219.3 55.101 Q 219.3 62.001 225 62.001 Q 230.7 62.001 230.7 55.101 Z M 357.1 55.101 L 357.1 16.901 Q 357.1 10.001 351.4 10.001 Q 345.7 10.001 345.7 16.901 L 345.7 55.101 Q 345.7 62.001 351.4 62.001 Q 357.1 62.001 357.1 55.101 Z M 45.7 47.801 L 55.6 47.801 L 50.7 13.201 L 50.5 13.201 L 45.7 47.801 Z M 11 32.501 L 16.2 32.501 Q 18.9 32.501 20.25 31.001 Q 21.6 29.501 21.6 25.901 L 21.6 17.601 Q 21.6 14.001 20.25 12.501 Q 18.9 11.001 16.2 11.001 L 11 11.001 L 11 32.501 Z"
              fill="none"
              stroke="url(#notFoundGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#notFoundGlow)"
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

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-gray-400 text-lg md:text-xl mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 text-sm md:text-base">
            It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Go Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-orange-500/30 text-gray-300 hover:text-orange-400 font-semibold text-lg transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Error Code */}
        <div className={`${teko.className} text-center mt-12`}>
          <p className="text-gray-600 text-sm tracking-widest uppercase">
            Error Code: 404
          </p>
        </div>
      </div>
    </div>
  );
}
