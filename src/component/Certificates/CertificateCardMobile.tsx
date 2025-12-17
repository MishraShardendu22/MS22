// Mobile-optimized Certificates Display - minimal JS, no animations, no backdrop-blur
"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingStateMobile } from "@/component/Loading";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";
import { formatDate } from "@/utils/formatDate";

const CertificateCardMobile = ({ certificate }: { certificate: Certificate }) => {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-bold text-white line-clamp-1 flex-1">
          {certificate.title}
        </h3>
        {certificate.verified && (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
      </div>
      <p className="text-sm text-emerald-400 mb-1">{certificate.issuer}</p>
      <p className="text-xs text-gray-500 mb-2">
        Issued {formatDate(certificate.issue_date, { fallback: "" })}
        {certificate.expiry_date ? ` • Expires ${formatDate(certificate.expiry_date, { fallback: "" })}` : " • No Expiration"}
      </p>
      {certificate.description && (
        <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
          {certificate.description}
        </p>
      )}
      <div className="flex flex-wrap gap-1">
        {certificate.skills?.slice(0, 3).map((skill, idx) => (
          <span key={idx} className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded">
            {skill}
          </span>
        ))}
        {certificate.skills && certificate.skills.length > 3 && (
          <span className="px-2 py-0.5 text-xs bg-emerald-900/50 text-emerald-400 rounded">
            +{certificate.skills.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export const CertificatesDisplayMobile = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await certificatesAPI.getAllCertificates(1, 4);
        if (response.status === 200 && response.data) {
          const certs = response.data.certifications || [];
          setCertificates(certs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)));
        }
      } catch (err) {
        setError("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Certifications</h2>
        <LoadingStateMobile />
      </section>
    );
  }

  if (error || certificates.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Certifications</h2>
        <p className="text-gray-400 text-sm">{error || "No certificates available"}</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-emerald-400">Certifications</h2>
        <Link href="/certificates" className="text-sm text-gray-400 hover:text-emerald-400">
          View All →
        </Link>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Professional certifications and achievements
      </p>
      <div className="space-y-4">
        {certificates.map((certificate, index) => (
          <CertificateCardMobile 
            key={certificate._id || certificate.credential_id || `cert-${index}`} 
            certificate={certificate} 
          />
        ))}
      </div>
    </section>
  );
};
