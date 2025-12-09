import { ExternalLink, Github, Play } from 'lucide-react'
import type { Project } from '@/static/api/api.types'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative bg-linear-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-gray-800 rounded-xl p-5 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1 min-h-72 flex flex-col">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
            {project.project_name}
          </h3>
          <div className="flex gap-1.5 shrink-0">
            {project.project_repository && (
              <a
                href={project.project_repository}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-gray-800/50 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 hover:scale-110 group/icon"
                aria-label="View repository"
              >
                <Github className="w-3.5 h-3.5 text-gray-400 group-hover/icon:text-cyan-400" />
              </a>
            )}
            {project.project_live_link && (
              <a
                href={project.project_live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-gray-800/50 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-110 group/icon"
                aria-label="View live project"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover/icon:text-blue-400" />
              </a>
            )}
            {project.project_video && (
              <a
                href={project.project_video}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-gray-800/50 hover:bg-purple-500/20 rounded-lg transition-all duration-300 hover:scale-110 group/icon"
                aria-label="Watch video"
              >
                <Play className="w-3.5 h-3.5 text-gray-400 group-hover/icon:text-purple-400" />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-xs mb-3 line-clamp-2 flex-1">
          {project.small_description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.skills.slice(0, 5).map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-0.5 text-[10px] font-medium bg-linear-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 rounded-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 5 && (
            <span className="px-2.5 py-0.5 text-[10px] font-medium text-gray-500">
              +{project.skills.length - 5}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
