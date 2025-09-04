import {useState} from 'react';
import ForkIcon from "../asset/svg/fork.svg";
import StarIcon from "../asset/svg/star.svg";
import RepoIcon from "../asset/svg/repo.svg";
import UserCardId from "../asset/svg/user_card_id.svg"
import FolderIcon from "../asset/svg/folder.svg";
import {github, IGitHubRepo} from "../config/github";

const Project = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

    const getLanguageColor = (language: string): string => {
        const colors: Record<string, string> = {
            'JavaScript': '#f7df1e',
            'TypeScript': '#3178c6',
            'Python': '#3776ab',
            'Java': '#ed8b00',
            'C++': '#00599c',
            'C': '#a8b9cc',
            'C#': '#239120',
            'PHP': '#777bb4',
            'Ruby': '#cc342d',
            'Go': '#00add8',
            'Rust': '#dea584',
            'Swift': '#fa7343',
            'Kotlin': '#7f52ff',
            'Dart': '#0175c2',
            'HTML': '#e34f26',
            'CSS': '#1572b6',
            'SCSS': '#cf649a',
            'Vue': '#4fc08d',
            'React': '#61dafb',
            'Shell': '#89e051',
            'Dockerfile': '#384d54',
        };
        return colors[language] || '#6b7280';
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;

        return `${Math.ceil(diffDays / 365)} years ago`;
    };

    const getFilteredRepos = (): IGitHubRepo[] => {
        if (selectedLanguage === 'all') {
            return github.featured || [];
        }

        return github.byLanguage[selectedLanguage] || [];
    };

    return (
        <div className="min-h-screen font-mono pb-16"
             style={{
                 backgroundColor: 'var(--theme-background)',
                 color: 'var(--theme-text)'
             }}>
            <div className="max-w-6xl mx-auto py-4 sm:py-8 px-2 sm:px-4">

                {/* Terminal window */}
                <div className="bg-gray-900 border border-gray-700 rounded-t-lg">
                    <div
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-b border-gray-700 space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-black border-x border-b border-gray-700 rounded-b-lg p-4 sm:p-8">
                    {/* Header */}
                    <div className="mb-6 border-b border-gray-800 pb-4">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-green-400">
                            <span className="text-gray-600"></span>Projects
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="text-orange-400 flex items-center">
                                <img src={UserCardId} className="w-4 h-4 mr-1" alt="UserCardId"/>
                                @{github.user.login}</span>
                            <span className="text-blue-400 flex items-center">
                                <img src={RepoIcon} className="w-4 h-4 mr-1" alt="Repo"/>
                                {github.stats.totalRepos} repos</span>
                            <span className="text-yellow-400 flex items-center">
                                <img src={StarIcon} className="w-4 h-4 mr-1" alt="Star"/>
                                {github.stats.totalStars} stars
                            </span>
                            <span className="text-purple-400 flex items-center">
                                <img src={ForkIcon} className="w-4 h-4 mr-1" alt="Fork"/>
                                {github.stats.totalForks} forks
                            </span>
                        </div>
                    </div>

                    {/* GitHub Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                            <div className="text-blue-400 text-2xl font-bold">{github.stats.totalRepos}</div>
                            <div className="text-gray-400 text-sm">Repos</div>
                        </div>
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                            <div className="text-yellow-400 text-2xl font-bold">{github.stats.totalStars}</div>
                            <div className="text-gray-400 text-sm">Total Stars</div>
                        </div>
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                            <div className="text-purple-400 text-2xl font-bold">{github.stats.totalForks}</div>
                            <div className="text-gray-400 text-sm">Total Forks</div>
                        </div>
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                            <div className="text-green-400 text-2xl font-bold">{github.stats.languages.length}</div>
                            <div className="text-gray-400 text-sm">Languages</div>
                        </div>
                    </div>

                    {/* All Languages Section */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-green-400 mb-3">
                            <span className="text-gray-600"></span>All Languages Used
                        </h2>
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                            <div className="flex flex-wrap gap-2">
                                {github.stats.allLanguages.map((language) => (
                                    <div
                                        key={language}
                                        className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg"
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{backgroundColor: getLanguageColor(language)}}
                                        ></div>
                                        <span className="text-gray-300 text-sm">{language}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 text-gray-400 text-xs">
                                Total: {github.stats.allLanguages.length} languages across all repositories
                            </div>
                        </div>
                    </div>

                    {/* Language Filter */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-green-400 mb-3">
                            <span className="text-gray-600"></span>Filter by Language
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedLanguage('all')}
                                className={`px-3 py-1 cursor-pointer rounded text-sm border transition-colors ${selectedLanguage === 'all'
                                    ? 'bg-green-600 border-green-600 text-white'
                                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                All ({github.featured?.length || 0})
                            </button>
                            {github.stats.languages.map((language) => (
                                <button
                                    key={language}
                                    onClick={() => setSelectedLanguage(language)}
                                    className={`px-3 py-1 cursor-pointer rounded text-sm border transition-colors flex items-center space-x-2 ${selectedLanguage === language
                                        ? 'bg-green-600 border-green-600 text-white'
                                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                                    }`}
                                >
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{backgroundColor: getLanguageColor(language)}}
                                    ></div>
                                    <span>{language} ({github.byLanguage[language]?.length || 0})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-green-400 mb-4">
                            <span className="text-gray-600"></span>
                            {selectedLanguage === 'all' ? 'Featured Projects' : `${selectedLanguage} Projects`}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getFilteredRepos().map((repo, index) => (
                                <div key={index}
                                     className="bg-gray-800 border border-gray-600 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-blue-400 font-semibold text-lg hover:text-blue-300">
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline block truncate max-w-48"
                                                title={repo.name}
                                            >
                                                {repo.name}
                                            </a>
                                        </h3>
                                        <div className="flex items-center space-x-2 text-sm">
                                            {repo.stargazers_count > 0 && (
                                                <span className="text-yellow-400 flex items-center">
                                                    <img src={StarIcon} className="w-4 h-4 mr-1" alt="Star"/>
                                                    {repo.stargazers_count}
                                                </span>
                                            )}
                                            {repo.forks_count > 0 && (
                                                <span className="text-purple-400 flex items-center">
                                                    <img src={ForkIcon} className="w-4 h-4 mr-1" alt="Fork"/>
                                                    {repo.forks_count}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                        {repo.description || 'No description available'}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            {repo.primaryLanguages && repo.primaryLanguages.length > 0 ? (
                                                <div className="flex items-center space-x-2">
                                                    {repo.primaryLanguages.map((lang, langIndex) => (
                                                        <div key={langIndex} className="flex items-center space-x-1">
                                                            <div
                                                                className="w-3 h-3 rounded-full"
                                                                style={{backgroundColor: getLanguageColor(lang)}}
                                                            ></div>
                                                            <span className="text-gray-400 text-sm">{lang}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : repo.language && (
                                                <div className="flex items-center space-x-1">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{backgroundColor: getLanguageColor(repo.language)}}
                                                    ></div>
                                                    <span className="text-gray-400 text-sm">{repo.language}</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-gray-500 text-xs">
                                            {formatDate(repo.modified_at)}
                                        </span>
                                    </div>

                                    {repo.topics && repo.topics.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {repo.topics.slice(0, 3).map((topic, topicIndex) => (
                                                <span
                                                    key={topicIndex}
                                                    className="bg-gray-700 text-blue-300 px-2 py-1 rounded text-xs"
                                                >
                                                    {topic.name}
                                                </span>
                                            ))}
                                            {repo.topics.length > 3 && (
                                                <span className="text-gray-500 text-xs py-1">
                                                    +{repo.topics.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {getFilteredRepos().length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <div className="text-4xl mb-2">
                                    <img src={FolderIcon} className="w-16 h-16 mx-auto" alt="Folder"/>
                                </div>
                                <p>No projects found
                                    for {selectedLanguage === 'all' ? 'this filter' : selectedLanguage}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;