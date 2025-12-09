import axios from 'axios'
import { API_BASE_URL } from '@/constants/url'

const BASE_URL = API_BASE_URL
const withTimeout = (url: string, ms = 8000) => {
  console.log('🔄 Fetching:', url)
  return axios.get(url, { timeout: ms })
    .then(res => {
      console.log('✅ Success:', url, res.data)
      return res
    })
    .catch(err => {
      console.log('❌ Failed:', url, err.message)
      return null
    })
}

export async function fetchAllStats() {
  console.log('📊 Starting fetchAllStats with BASE_URL:', BASE_URL)
  
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
  
  console.log('📊 Final stats result:', result)
  return result
}
