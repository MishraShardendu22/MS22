import { Heart } from "lucide-react";
import { Sidebar } from "@/component/Sidebar";
import { volunteerAPI } from "@/static/api/api.request";
import { VolunteerClient } from "@/component/Volunteer";
import type { Volunteer } from "@/static/api/api.types";

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function VolunteerPage() {
  // Fetch all volunteer experiences with error handling
  let volunteers: Volunteer[] = [];
  try {
    const response = await volunteerAPI.getAllVolunteers(1, 500);
    volunteers = response.status === 200 && response.data ? response.data.volunteer_experiences || [] : [];
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    // Return empty array on error - client will handle
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Header */}
        <header className="relative border-b border-gray-800/50 z-10">
          <div className="absolute inset-0 bg-linear-to-b from-pink-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-semibold mb-8 backdrop-blur-sm animate-fadeIn">
                <Heart className="w-4 h-4" />
                <span>Community Impact</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fadeInUp">
                Volunteer{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-500 to-cyan-600 animate-gradient">
                  Experience
                </span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed animate-fadeInUp animation-delay-200">
                Explore my volunteer work and contributions to various
                communities and organizations
              </p>
            </div>
          </div>
        </header>

        <VolunteerClient initialVolunteers={volunteers} />
      </main>
    </>
  );
}
