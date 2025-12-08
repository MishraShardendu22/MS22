import { Book, Code2Icon, CompassIcon, GithubIcon, LinkedinIcon, LockKeyhole, MailIcon, XIcon, YoutubeIcon } from "lucide-react"

export const QuickLinks = {
    Projects: '/projects',
    Experience: '/experience',
    TechBlogs: '/blogs',
    AdminPortal: '/admin',
}

export const MyWebsites = {
    portfolio :{
        url: 'https://mishrashardendu22.is-a.dev',
        icon: Code2Icon,
        name: 'Personal Website',
    },
    techBlog: {
        url: 'https://blog.mishrashardendu22.is-a.dev',
        icon: Book,
        name: 'Blog Website',
    },
    treasureHunt: {
        url: 'https://treasure-hunt.mishrashardendu22.is-a.dev/',
        icon: LockKeyhole,
        name: 'Treasure Hunt',
    },
    uiLibrary: {
        url  : 'https://pixel-art-8-bit.mishrashardendu22.is-a.dev',
        icon : CompassIcon,
        name: 'My UI Library',
    }
}

export const SocialMedia = {

    Twitter: {
        url: 'https://x.com/Shardendu_M',
        icon: XIcon,
    },
    LinkedIn: {
        url: 'https://www.linkedin.com/in/shardendumishra22',
        icon: LinkedinIcon,
    },
    YouTube: {
        url: 'https://www.youtube.com/@Shardendu_Mishra',
        icon: YoutubeIcon,
    },
    Email: {
        url: 'mailto:shardendumishra01@gmail.com',
        icon: MailIcon,
    }
}

export const CodingProfiles = {
    GitHubMain: {
        url: 'https://github.com/MishraShardendu22',
        icon: GithubIcon,
    },
    LeetCode: {
        url: 'https://leetcode.com/mishrashardendu22',
        icon: Code2Icon
    },
    GitHubProject: {
        url: 'https://github.com/ShardenduMishra22',
        icon: GithubIcon,
    },
    Codeforces: {
        url: 'https://codeforces.com/profile/MishraShardendu22',
        icon: Code2Icon
    },
}


export const images = {
    go : {
        loc: "/go.avif",
        alt: "Golang Logo"
    },
    fedora: {
        loc: "/fedora.avif",
        alt: "Fedora Logo"
    }
}