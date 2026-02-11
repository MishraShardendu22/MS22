import { LoadingStateLight } from "@/component/Loading";

export default function CertificatesLoading() {
  return (
    <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
      <LoadingStateLight variant="cyan" message="Loading certificates..." />
    </main>
  );
}
