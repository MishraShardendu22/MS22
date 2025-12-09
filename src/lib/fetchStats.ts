import axios from 'axios'
import { API_BASE_URL } from '@/constants/url'

const BASE_URL = API_BASE_URL
const withTimeout = (url: string, ms = 8000) => {
  return axios.get(url, { timeout: ms })
    .then(res => res)
    .catch(err => null)
}

export async function fetchAllStats() {
  const [lc, gh] = await Promise.all([
    withTimeout(`${BASE_URL}/api/leetcode`),
    withTimeout(`${BASE_URL}/api/github`),
  ])

  const [commits, langs, stars, top, cal] = await Promise.all([
    withTimeout(`${BASE_URL}/api/github/commits`),
    withTimeout(`${BASE_URL}/api/github/languages`),
    withTimeout(`${BASE_URL}/api/github/stars`),
    withTimeout(`${BASE_URL}/api/github/top-repos`),
    withTimeout(`${BASE_URL}/api/github/calendar`),
  ])

  const result = {
    leetcode: lc?.data?.data?.matchedUser || {},
    github: gh?.data || {},
    commits: commits?.data || [],
    languages: langs?.data || {},
    stars: stars?.data?.stars || 0,
    topRepos: top?.data || [],
    calendar: cal?.data || {},
  }
  
  return result
}
