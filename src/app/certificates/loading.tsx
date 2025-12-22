import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";

export default function CertificatesLoading() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        <LoadingState variant="cyan" message="Loading certificates..." />
      </main>
    </>
  );
}
