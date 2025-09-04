import {useState} from 'react';
import DiscordIcon from "../asset/svg/discord.svg";
import LinkedinIcon from "../asset/svg/linkedin.svg";
import TwitterIcon from "../asset/svg/twitter.svg";
import GmailIcon from "../asset/svg/gmail.svg";
import TelegramIcon from "../asset/svg/telegram.svg";
import PopularIcon from "../asset/svg/hot.svg";
import AvailableIcon from "../asset/svg/presence_available.svg";
import ConstructionIcon from "../asset/svg/construction.svg";
import BoxIcon from "../asset/svg/box.svg";
import DollarIcon from "../asset/svg/dollar_circle.svg";
import TimeIcon from "../asset/svg/time.svg";
import {services, IService} from "../config/service";

const Service = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const getFilteredServices = (): IService[] => {
        if (selectedCategory === 'all') {
            return services;
        }
        return services.filter(service => service.category === selectedCategory);
    };

    const getCategories = (): string[] => {
        const categories = Array.from(new Set(services.map(service => service.category)));
        return categories;
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'popular':
                return 'text-red-400';
            case 'coming-soon':
                return 'text-gray-400';
            default:
                return 'text-green-400';
        }
    };

    const getStatusLabel = (status: string): any => {
        switch (status) {
            case 'popular':
                return <span className="flex items-center"><img src={PopularIcon} className="w-4 h-4 mr-1"
                                                                alt="Popular"/>Popular</span>;
            case 'coming-soon':
                return <span className="flex items-center"><img src={ConstructionIcon} className="w-4 h-4 mr-1"
                                                                alt="Coming Soon"/>Coming Soon</span>;
            default:
                return <span className="flex items-center"><img src={AvailableIcon} className="w-4 h-4 mr-1"
                                                                alt="Available"/>Available</span>;
        }
    };

    const countServicesWithStatus = (statusToCount: string): number => {
        return services.filter(service => service.status.includes(statusToCount as any)).length;
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
                            <span className="text-gray-600"></span>Services
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="text-blue-400 flex items-center">
                                <img src={BoxIcon} className="w-4 h-4 mr-2" alt="Box"/>
                                {services.length} services
                            </span>
                            <span className="text-red-400 flex items-center">
                                <img src={PopularIcon} className="w-4 h-4 mr-2" alt="Popular"/>
                                {countServicesWithStatus('popular')} popular</span>
                            <span className="text-green-400 flex items-center">
                                <img src={AvailableIcon} className="w-4 h-4 mr-2" alt="Available"/>
                                {countServicesWithStatus('available')} available</span>
                            <span className="text-gray-400 flex items-center">
                                <img src={ConstructionIcon} className="w-4 h-4 mr-2" alt="Construction"/>
                                {countServicesWithStatus('coming-soon')} coming soon</span>
                        </div>
                    </div>

                    {/* Service Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                            <div className="text-blue-400 text-2xl font-bold">{services.length}</div>
                            <div className="text-gray-400 text-sm">Total Services</div>
                        </div>
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                            <div className="text-yellow-400 text-2xl font-bold">{getCategories().length}</div>
                            <div className="text-gray-400 text-sm">Categories</div>
                        </div>
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                            <div
                                className="text-green-400 text-2xl font-bold">{countServicesWithStatus('available')}</div>
                            <div className="text-gray-400 text-sm">Available Now</div>
                        </div>
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                            <div className="text-purple-400 text-2xl font-bold">24/7</div>
                            <div className="text-gray-400 text-sm">Support</div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-green-400 mb-3">
                            <span className="text-gray-600"></span>Filter by Category
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-3 py-1 cursor-pointer rounded text-sm border transition-colors ${selectedCategory === 'all'
                                    ? 'bg-green-600 border-green-600 text-white'
                                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                All ({services.length})
                            </button>
                            {getCategories().map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 py-1 cursor-pointer rounded text-sm border transition-colors ${selectedCategory === category
                                        ? 'bg-green-600 border-green-600 text-white'
                                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                                    }`}
                                >
                                    {category} ({services.filter(s => s.category === category).length})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-green-400 mb-4">
                            <span className="text-gray-600"></span>
                            {selectedCategory === 'all' ? 'All Services' : `${selectedCategory} Services`}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {getFilteredServices().map((service) => (
                                <div key={service.id}
                                     className="bg-gray-800 border border-gray-600 rounded-lg p-6 hover:bg-gray-750 transition-colors flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-blue-400 font-semibold text-xl">
                                            {service.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {service.status.map((statusItem, index) => (
                                                <span key={index} className={`text-sm ${getStatusColor(statusItem)}`}>
                                                    {getStatusLabel(statusItem)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-gray-300 text-sm mb-4">
                                        {service.description}
                                    </p>

                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            {service.price && (
                                                <span className="text-green-400 flex items-center">
                                                    <img src={DollarIcon} className="w-4 h-4 mr-1" alt="Price"/>
                                                    {service.price}</span>
                                            )}
                                            {service.duration && (
                                                <span className="text-yellow-400 flex items-center">
                                                    <img src={TimeIcon} className="w-4 h-4 mr-1" alt="Duration"/>
                                                    {service.duration}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-4 flex-grow">
                                        <h4 className="text-green-400 font-semibold mb-2 text-sm">Key Features:</h4>
                                        <ul className="space-y-1">
                                            {service.features.slice(0, 3).map((feature, index) => (
                                                <li key={index} className="text-gray-300 text-sm">
                                                    • {feature}
                                                </li>
                                            ))}
                                            {service.features.length > 3 && (
                                                <li className="text-gray-500 text-sm">
                                                    • +{service.features.length - 3} more features
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Technologies */}
                                    {service.technologies && service.technologies.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-green-400 font-semibold mb-2 text-sm">Technologies:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {service.technologies.slice(0, 5).map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-gray-700 text-blue-300 px-2 py-1 rounded text-xs"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {service.technologies.length > 5 && (
                                                    <span
                                                        className="bg-gray-600 text-gray-400 px-2 py-1 rounded text-xs">
                                                        +{service.technologies.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <div className="mt-auto pt-2">
                                        {service.status.includes('coming-soon') ? (
                                            <button
                                                disabled
                                                className="w-full bg-gray-600 border border-gray-500 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed"
                                            >
                                                Coming Soon
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full bg-green-600 hover:bg-green-700 border border-green-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                                                Get Started
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {getFilteredServices().length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <div className="text-4xl mb-2">🔍</div>
                                <p>No services found
                                    for {selectedCategory === 'all' ? 'this filter' : selectedCategory}</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-green-400 mb-4">
                            <span className="text-gray-600"></span>Need Something Custom?
                        </h2>
                        <p className="text-gray-300 text-sm mb-4">
                            Don't see exactly what you're looking for? I offer custom solutions tailored to your
                            specific needs.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3"> {/* 改为 5 列 */}
                            <a
                                href="mailto:donaldturinglee@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="!bg-red-600 hover:!bg-red-700 border border-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <img src={GmailIcon} className="w-4 h-4 brightness-0 invert" alt="Gmail"/>
                                Email
                            </a>
                            <a
                                href="https://discord.gg/YsteKRjrSH"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="!bg-indigo-600 hover:!bg-indigo-700 border border-indigo-600 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <img src={DiscordIcon} className="w-4 h-4" alt="Discord"/>
                                Discord
                            </a>
                            <a
                                href="https://www.linkedin.com/in/donaldturinglee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="!bg-blue-700 hover:!bg-blue-800 border border-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <img src={LinkedinIcon} className="w-4 h-4" alt="LinkedIn"/>
                                LinkedIn
                            </a>
                            <a
                                href="https://x.com/donaldturinglee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="!bg-blue-400 hover:!bg-blue-500 border border-blue-400 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <img src={TwitterIcon} className="w-4 h-4" alt="Twitter"/>
                                Twitter
                            </a>
                            <a
                                href="https://t.me/donaldturinglee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="!bg-cyan-600 hover:!bg-cyan-700 border border-cyan-600 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <img src={TelegramIcon} className="w-4 h-4" alt="Telegram"/>
                                Telegram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;