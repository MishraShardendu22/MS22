import { LoadingStateLight } from "@/component/Loading";

export default function VolunteerLoading() {
  return (
    <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
      <LoadingStateLight
        variant="pink"
        message="Loading volunteer experiences..."
      />
    </main>
  );
}
