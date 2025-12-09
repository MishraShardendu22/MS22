// GitHub Types
export interface GitHubData {
  login: string
  name: string
  avatar_url: string
  bio: string
  location: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  html_url: string
}

export interface Repository {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  forks_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
}

// LeetCode Types
export interface LeetCodeData {
  profile: {
    realName: string
    ranking: number
    userAvatar: string
  }
  submitStats: {
    acSubmissionNum: Array<{
      difficulty: string
      count: number
      submissions: number
    }>
  }
}
