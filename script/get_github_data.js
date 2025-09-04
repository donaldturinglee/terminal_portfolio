/**
 * GitHub Repository Data Fetcher using Node.js and GitHub REST API
 * This script fetches repository information and generates a static JSON file
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const BASE_URL = 'https://api.github.com';

// Headers for GitHub API requests
const headers = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'GitHub-Data-Fetcher/1.0',
    ...(GITHUB_TOKEN && {'Authorization': `Bearer ${GITHUB_TOKEN}`})
};

/**
 * Make a request to GitHub API
 */
async function githubRequest(url) {
    try {
        const response = await fetch(url, {headers});

        if (!response.ok) {
            throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`❌ Error fetching ${url}:`, error.message);
        throw error;
    }
}

/**
 * Get all repositories for a user with pagination
 */
async function getAllRepositories(username) {
    let allRepos = [];
    let page = 1;
    const perPage = 100;

    while (true) {
        const url = `${BASE_URL}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`;
        const repos = await githubRequest(url);

        if (repos.length === 0) break;

        allRepos = allRepos.concat(repos);
        page++;

        // Rate limiting: wait a bit between requests
        if (repos.length === perPage) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    return allRepos;
}

/**
 * Get repository languages
 */
async function getRepositoryLanguages(username, repoName) {
    try {
        const url = `${BASE_URL}/repos/${username}/${repoName}/languages`;
        return await githubRequest(url);
    } catch (error) {
        console.warn(`⚠️  Could not fetch languages for ${repoName}`);
        return {};
    }
}

/**
 * Get enhanced primary languages based on repo's primary language
 */
function getEnhancedLanguages(primaryLanguage) {
    const languageMap = {
        'TypeScript': ['TypeScript', 'JavaScript'],
        'JavaScript': ['JavaScript', 'HTML'],
        'Python': ['Python', 'Shell'],
        'Rust': ['Rust', 'TOML'],
        'Go': ['Go', 'Docker'],
        'Java': ['Java', 'Kotlin'],
        'C++': ['C++', 'C'],
        'Vue': ['Vue', 'JavaScript'],
        'React': ['React', 'TypeScript'],
        'CSS': ['CSS', 'HTML'],
        'SCSS': ['SCSS', 'CSS'],
        'Shell': ['Shell', 'Makefile']
    };

    if (!primaryLanguage) return [];

    return languageMap[primaryLanguage] || [primaryLanguage];
}

/**
 * Transform repository data to match the TypeScript interface
 */
function transformRepository(repo, languages = {}) {
    const primaryLanguages = getEnhancedLanguages(repo.language);

    return {
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        primaryLanguages,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        created_at: repo.created_at,
        modified_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        topics: repo.topics ? repo.topics.map(topic => ({name: topic})) : null,
        license: repo.license,
        isPrivate: repo.private,
        isFork: repo.fork,
        isArchived: repo.archived,
        languages: Object.keys(languages)
    };
}

/**
 * Calculate repository statistics
 */
function calculateStats(repositories) {
    const publicRepos = repositories.filter(repo => !repo.isFork && !repo.isPrivate);
    const activeRepos = repositories.filter(repo => !repo.isFork && !repo.isArchived);

    const totalStars = publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = publicRepos.reduce((sum, repo) => sum + repo.forks_count, 0);

    const languages = [...new Set(
        activeRepos
            .filter(repo => repo.language)
            .map(repo => repo.language)
    )];

    const allLanguages = [...new Set(
        activeRepos
            .flatMap(repo => repo.primaryLanguages || [])
            .filter(Boolean)
    )].sort();

    return {
        totalRepos: repositories.length,
        totalStars,
        totalForks,
        languages,
        allLanguages
    };
}

/**
 * Get featured repositories (top 12 by stars)
 */
function getFeaturedRepositories(repositories) {
    return repositories
        .filter(repo =>
            !repo.isFork &&
            !repo.isArchived &&
            repo.description &&
            repo.description.trim() !== ''
        )
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 12);
}

/**
 * Group repositories by language
 */
function groupByLanguage(repositories) {
    const grouped = {};

    repositories
        .filter(repo =>
            !repo.isFork &&
            !repo.isArchived &&
            repo.description &&
            repo.language
        )
        .forEach(repo => {
            const lang = repo.language;
            if (!grouped[lang]) {
                grouped[lang] = [];
            }
            grouped[lang].push(repo);
        });

    return grouped;
}

/**
 * Main function
 */
async function main() {
    try {
        // Validate environment variables
        if (!GITHUB_USERNAME) {
            console.error('❌ GITHUB_USERNAME environment variable is required');
            process.exit(1);
        }

        if (GITHUB_TOKEN) {
            console.log('✅ GitHub credentials configured');
        } else {
            console.log('⚠️  Running without GitHub token (rate limited to 60 requests/hour)');
        }

        // Fetch user information
        console.log('📊 Fetching user information...');
        const userData = GITHUB_TOKEN
            ? await githubRequest(`${BASE_URL}/user`)
            : await githubRequest(`${BASE_URL}/users/${GITHUB_USERNAME}`);

        // Fetch all repositories
        console.log('📁 Fetching repositories...');
        const rawRepos = await getAllRepositories(GITHUB_USERNAME);

        console.log(`🔍 Enhancing ${rawRepos.length} repositories with language details...`);

        // Transform repositories and optionally fetch language data
        const repositories = [];
        for (const repo of rawRepos) {
            let languages = {};

            // Optionally fetch detailed language data for non-fork repos
            if (!repo.fork && !repo.archived) {
                try {
                    languages = await getRepositoryLanguages(GITHUB_USERNAME, repo.name);
                    // Small delay to respect rate limits
                    await new Promise(resolve => setTimeout(resolve, 50));
                } catch (error) {
                    // Continue without detailed language data
                }
            }

            repositories.push(transformRepository(repo, languages));
        }

        // Calculate statistics
        const stats = calculateStats(repositories);

        // Get featured repositories
        const featured = getFeaturedRepositories(repositories);

        // Group by language
        const byLanguage = groupByLanguage(repositories);

        // Create output directory
        const outputDir = path.join('src', 'data');
        await fs.mkdir(outputDir, {recursive: true});

        // Generate the projects data file
        const outputData = {
            lastUpdated: new Date().toISOString(),
            user: {
                login: userData.login,
                name: userData.name,
                bio: userData.bio,
                public_repos: userData.public_repos,
                followers: userData.followers,
                following: userData.following,
                avatar_url: userData.avatar_url
            },
            repositories,
            stats,
            featured,
            byLanguage
        };

        const outputPath = path.join(outputDir, 'github.json');
        await fs.writeFile(outputPath, JSON.stringify(outputData, null, 4));

        console.log('✅ GitHub data fetched successfully!');
        console.log(`📄 Generated: ${outputPath}`);

        // Show statistics
        const publicRepos = repositories.filter(repo => !repo.isFork && !repo.isPrivate).length;

        console.log('');
        console.log('📈 Repository Stats:');
        console.log(`   • Total Public Repos: ${publicRepos}`);
        console.log(`   • Total Stars: ${stats.totalStars}`);
        console.log(`   • Total Forks: ${stats.totalForks}`);
        console.log(`   • Languages: ${stats.languages.join(', ')}`);
        console.log('');
        console.log('🚀 You can now use this data in your React application!');

    } catch (error) {
        console.error('❌ Script failed:', error.message);
        process.exit(1);
    }
}

// Run the script
main();