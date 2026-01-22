import { LoadingState } from "@/component/Loading";

export default function ExperiencesLoading() {
  return (
    <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
      <LoadingState variant="cyan" message="Loading experiences..." />
    </main>
  );
}
