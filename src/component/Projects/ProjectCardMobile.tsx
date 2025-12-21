// Mobile-optimized Projects Display - minimal JS, no animations, no backdrop-blur
"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingStateMobile } from "@/component/Loading";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";

const ProjectCardMobile = ({ project }: { project: Project }) => {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4">
      <h3 className="text-base font-bold text-white mb-2 line-clamp-1">
        {project.project_name}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
        {project.small_description}
      </p>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.skills.slice(0, 3).map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded"
          >
            {skill}
          </span>
        ))}
        {project.skills.length > 3 && (
          <span className="px-2 py-0.5 text-xs bg-cyan-900/50 text-cyan-400 rounded">
            +{project.skills.length - 3}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
        {project.project_repository && (
          <Link
            href={project.project_repository}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded"
          >
            <Github className="w-3 h-3" />
            <span>Code</span>
          </Link>
        )}
        {project.project_live_link && (
          <Link
            href={project.project_live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Live</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export const ProjectsDisplayMobile = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAllProjects(1, 4);
        if (response.status === 200 && response.data) {
          setProjects(response.data.projects.sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Projects</h2>
        <LoadingStateMobile />
      </section>
    );
  }

  if (error || projects.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Projects</h2>
        <p className="text-gray-400 text-sm">
          {error || "No projects available"}
        </p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">Projects</h2>
        <Link
          href="/projects"
          className="text-sm text-gray-400 hover:text-cyan-400"
        >
          View All →
        </Link>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        A showcase of my work and open-source contributions
      </p>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCardMobile key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};
