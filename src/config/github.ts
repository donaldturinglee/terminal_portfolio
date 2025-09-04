const githubData = require("../data/github.json")

export interface IGitHubRepo {
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    primaryLanguages?: string[];
    stargazers_count: number;
    forks_count: number;
    created_at: string;
    modified_at: string;
    pushed_at: string;
    topics: Array<{ name: string }> | null;
    license: {
        key: string;
        name: string;
    } | null;
}

export interface IGitHub {
    lastUpdated: string;
    user: {
        login: string;
        name: string;
        bio: string;
        public_repos: number;
        followers: number;
        following: number;
        avatar_url: string;
    };
    repositories: any[];
    stats: {
        totalRepos: number;
        totalStars: number;
        totalForks: number;
        languages: string[];
        allLanguages: string[];
    };
    featured: IGitHubRepo[];
    byLanguage: Record<string, any[]>;
}

export const github: IGitHub = {
    lastUpdated: githubData.lastUpdated || new Date().toISOString(),
    user: {
        login: githubData.user?.login || '',
        name: githubData.user?.name || '',
        bio: githubData.user?.bio || '',
        public_repos: githubData.user?.public_repos || 0,
        followers: githubData.user?.followers || 0,
        following: githubData.user?.following || 0,
        avatar_url: githubData.user?.avatar_url || ''
    },
    repositories: githubData.repositories || [],
    stats: {
        totalRepos: githubData.stats?.totalRepos || 0,
        totalStars: githubData.stats?.totalStars || 0,
        totalForks: githubData.stats?.totalForks || 0,
        languages: githubData.stats?.languages || [],
        allLanguages: githubData.stats?.allLanguages || []
    },
    featured: githubData.featured || [],
    byLanguage: githubData.byLanguage || {}
};