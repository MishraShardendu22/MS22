import { Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Repository } from "@/types/stats";

interface ExtendedRepository extends Repository {
  url?: string;
  stars?: number;
}

const RepoCard = ({
  repo,
  index,
}: {
  repo: ExtendedRepository;
  index: number;
}) => {
  const repoUrl = repo.url || repo.html_url;
  const stars = repo.stars || repo.stargazers_count || 0;

  if (!repoUrl) return null;

  return (
    <Link
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/40 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
          {repo.name}
        </h4>
        <span className="text-xs text-gray-500">#{index + 1}</span>
      </div>
      {repo.description && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2">
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          <span>{stars}</span>
        </div>
        {repo.language && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{repo.language}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

interface TopRepositoriesCardProps {
  topRepos: Repository[];
}

export const TopRepositoriesCard = ({ topRepos }: TopRepositoriesCardProps) => {
  if (!topRepos) {
    return (
      <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
        <p className="text-red-400">Debug: topRepos is null or undefined</p>
      </div>
    );
  }

  if (!Array.isArray(topRepos)) {
    return (
      <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
        <p className="text-red-400">
          Debug: topRepos is not an array. Type: {typeof topRepos}
        </p>
        <pre className="text-xs text-gray-400 mt-2">
          {JSON.stringify(topRepos, null, 2)}
        </pre>
      </div>
    );
  }

  if (topRepos.length === 0) {
    return (
      <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
        <p className="text-yellow-400">Debug: topRepos array is empty</p>
      </div>
    );
  }

  const validRepos = topRepos.filter(
    (repo): repo is ExtendedRepository =>
      !!((repo as ExtendedRepository).url || repo.html_url),
  );

  if (validRepos.length === 0) {
    return (
      <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
        <p className="text-orange-400">
          Debug: No repos with valid url/html_url
        </p>
        <pre className="text-xs text-gray-400 mt-2">
          {JSON.stringify(topRepos.slice(0, 2), null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Top Repositories</h3>
          <p className="text-xs text-gray-400">Most Popular Projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {validRepos.slice(0, 6).map((repo, index) => (
          <RepoCard key={repo.name} repo={repo} index={index} />
        ))}
      </div>
    </div>
  );
};
