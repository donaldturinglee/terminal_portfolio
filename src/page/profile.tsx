import DiscordIcon from "../asset/svg/discord.svg";
import LinkedInIcon from "../asset/svg/linkedin.svg";
import YouTubeIcon from "../asset/svg/youtube.svg";
import GitHubIcon from "../asset/svg/github.svg";
import TwitterIcon from "../asset/svg/twitter.svg";
import CodeforcesIcon from "../asset/svg/codeforces.svg";
import CodewarsIcon from "../asset/svg/codewars.svg";
import GoogleIcon from "../asset/svg/google.svg";
import LocationIcon from "../asset/svg/location.svg";
import Avatar from "../asset/image/avatar.jpg";
import {profile} from "../config/profile";

const Profile = () => {
    return (
        <div className="min-h-screen font-mono pb-16"
             style={{
                 backgroundColor: 'var(--theme-background)',
                 color: 'var(--theme-text)'
             }}>
            <div className="max-w-6xl mx-auto py-4 sm:py-8 px-2 sm:px-4">

                {/* Profile Card */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gray-800 border-b border-gray-700 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8">
                        {/* Profile Header */}
                        <div className="text-center mb-8">
                            <div
                                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full border-4 border-green-400 overflow-hidden bg-gray-800">
                                <img
                                    src={Avatar}
                                    alt={
                                        profile.middleName ? `${profile.firstName} ${profile.middleName} ${profile.lastName}` : `${profile.firstName} ${profile.lastName}`
                                    }
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                                <span className="text-gray-600"></span>{profile.username}
                            </h1>
                            <p className="text-gray-300 text-sm sm:text-base mb-2">
                                {profile.title}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {profile.description}
                            </p>
                            {profile.location && (
                                <p className="text-gray-500 text-xs mt-2">
                                    <img src={LocationIcon} className="w-4 h-4 inline-block mr-1" alt="Location"/>
                                    {profile.location}
                                </p>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-green-400 mb-4">
                                <span className="text-gray-600"></span>Connect With Me
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {profile.socials?.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center hover:bg-gray-600 transition-all duration-200 ease-in-out cursor-pointer"
                                    >
                                        <div className="text-2xl mb-1 flex justify-center items-center">
                                            {social.name === 'github' && (
                                                <img
                                                    src={GitHubIcon}
                                                    alt="GitHub"
                                                    className="w-6 h-6"
                                                />
                                            )}
                                            {social.name === 'youtube' && (
                                                <img
                                                    src={YouTubeIcon}
                                                    alt="YouTube"
                                                    className="w-6 h-6"
                                                />
                                            )}
                                            {social.name === 'linkedin' && (
                                                <img
                                                    src={LinkedInIcon}
                                                    alt="LinkedIn"
                                                    className="w-6 h-6"
                                                />
                                            )}
                                            {social.name === 'discord' && (
                                                <img
                                                    src={DiscordIcon}
                                                    alt="Discord"
                                                    className="w-6 h-6"
                                                />
                                            )}
                                            {social.name === 'twitter' && (
                                                <img
                                                    src={TwitterIcon}
                                                    alt="Twitter"
                                                    className="w-6 h-6"
                                                />
                                            )}
                                        </div>
                                        <div className="text-blue-400 text-sm capitalize transition-colors">
                                            {social.name}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Current Focus */}
                        {profile.currentFocus && profile.currentFocus.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-green-400 mb-4">
                                    <span className="text-gray-600"></span>Current Focus
                                </h2>
                                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        {profile.currentFocus.map((item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Stats */}

                        {/* Languages and Tools */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-green-400 mb-4">
                                <span className="text-gray-600"></span>Languages and Tools
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {profile.skills?.map((skill, skillIndex) => {
                                    // Convert skill name to lowercase and handle special cases for the icon API
                                    const getSkillIconName = (skillName: string) => {
                                        const skillMap: { [key: string]: string } = {
                                            'typescript': 'ts',
                                            'javascript': 'js',
                                            'c++': 'cpp',
                                            'node.js': 'nodejs',
                                            'podman': 'podman',
                                            'react': 'react',
                                            'python': 'python',
                                            'postgresql': 'postgresql',
                                            'mongodb': 'mongodb',
                                            'redis': 'redis',
                                            'git': 'git',
                                            'tailwind css': 'tailwind',
                                            'rabbitmq': 'rabbitmq',
                                            'aws': 'aws',
                                            'azure': 'azure',
                                            'gcp': 'gcp',
                                            'latex': 'latex',
                                            'lua': 'lua',
                                            'arch linux': 'arch',
                                            'bash': 'bash'
                                        };

                                        const normalizedSkill = skillName.toLowerCase();
                                        return skillMap[normalizedSkill] || normalizedSkill;
                                    };

                                    const iconName = getSkillIconName(skill.name);

                                    return (
                                        <div
                                            key={skillIndex}
                                            className="flex items-center space-x-2 bg-gray-700 text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                                        >
                                            <img
                                                src={`https://go-skill-icons.vercel.app/api/icons?i=${iconName}&theme=dark`}
                                                alt={skill.name}
                                                className="w-5 h-5"
                                                onError={(e) => {
                                                    // If icon fails to load, hide the image and show text only
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                            <span className="text-sm font-medium">{skill.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-green-400 mb-4">
                                <span className="text-gray-600"></span>Achievements
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {profile.achievements?.map((achievement: any, index: number) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border text-card-foreground bg-gray-900 border-green-500 transition-all duration-300 ease-in-out group flex flex-col cursor-pointer hover:border-green-400 hover:bg-gray-800 hover:shadow-xl hover:shadow-green-500/25"
                                    >
                                        <div className="p-6 pb-2">
                                            <div className="flex flex-row space-x-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div
                                                            className="font-semibold leading-none tracking-tight text-green-400 transition-colors duration-300 group-hover:text-green-300">
                                                            {achievement.title.charAt(0).toUpperCase() + achievement.title.slice(1)}
                                                        </div>
                                                        {achievement.url && (
                                                            <a href={achievement.url} target="_blank"
                                                               rel="noopener noreferrer"
                                                               className="inline-flex items-center text-green-400 hover:text-green-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="24" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor" strokeWidth="2"
                                                                     strokeLinecap="round" strokeLinejoin="round"
                                                                     className="h-5 w-5 text-yellow-400 hover:text-yellow-300 transition duration-200">
                                                                    <path d="M15 3h6v6"></path>
                                                                    <path d="M10 14 21 3"></path>
                                                                    <path
                                                                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                </svg>
                                                                <span
                                                                    className="ml-1 text-sm text-yellow-400 hover:text-yellow-300 transition duration-200">View</span>
                                                            </a>
                                                        )}
                                                    </div>

                                                    <div
                                                        className="text-green-300/80 whitespace-pre-line text-base transition-colors duration-300 group-hover:text-green-200">
                                                        {achievement.description}
                                                    </div>
                                                </div>

                                                <div className="p-2 rounded-full">
                                                    {achievement.platform === "codeforces" && (
                                                        <img src={CodeforcesIcon} alt="Codeforces" className="w-6 h-6"/>
                                                    )}
                                                    {achievement.platform === "codewars" && (
                                                        <img src={CodewarsIcon} alt="Codewars" className="w-6 h-6"/>
                                                    )}
                                                    {achievement.platform === "google" && (
                                                        <img src={GoogleIcon} alt="Google" className="w-6 h-6"/>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 pt-0 flex-grow"></div>

                                        <div className="flex items-center p-6 mt-auto pt-2">
                                            <div className="flex justify-between items-center w-full">
                                                {achievement.date ? (
                                                    <>
                                <span
                                    className="text-green-300/70 transition-colors duration-300 group-hover:text-green-300">
                                    {achievement.date}
                                </span>
                                                        {achievement.type && (
                                                            <div
                                                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-green-500 text-green-400 transition-colors duration-300 group-hover:border-green-400 group-hover:text-green-300">
                                                                {achievement.type}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="w-full flex justify-end">
                                                        {achievement.type && (
                                                            <div
                                                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-green-500 text-green-400 transition-colors duration-300 group-hover:border-green-400 group-hover:text-green-300">
                                                                {achievement.type}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;