import React, {useState} from "react";
import {useTheme} from "../../context/theme";
import {getThemeDisplayNames} from "../../config/theme";
import {footer} from "../../config/footer";

const Footer = () => {
    const {currentTheme, setTheme, availableThemes} = useTheme();
    const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
    const themeDisplayNames = getThemeDisplayNames();

    const handleThemeChange = (themeName: string) => {
        setTheme(themeName);
        setIsThemeDropdownOpen(false);
    };

    return (
        <footer className="border-t p-2 sm:p-3 font-mono fixed bottom-0 left-0 right-0 z-10"
                style={{
                    backgroundColor: 'var(--theme-background)',
                    borderColor: 'var(--theme-border)'
                }}>
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs">

                {/* Desktop layout - horizontal */}
                <div className="hidden sm:flex items-center space-x-4" style={{color: 'var(--theme-muted)'}}>
                    <span>By {footer.author}</span>
                    <span>|</span>

                    {/* Theme Selector with Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-1 hover:opacity-70 transition-opacity"
                            style={{color: 'var(--theme-muted)'}}
                            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                        >
                            <span>{themeDisplayNames[currentTheme]}</span>
                            <svg
                                className={`w-3 h-3 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>

                        {/* Theme Dropdown */}
                        {isThemeDropdownOpen && (
                            <div
                                className="absolute bottom-full mb-1 left-0 border rounded shadow-lg min-w-40 z-20"
                                style={{
                                    backgroundColor: 'var(--theme-background)',
                                    borderColor: 'var(--theme-border)'
                                }}
                            >
                                {availableThemes.map((themeName) => (
                                    <button
                                        key={themeName}
                                        className="w-full px-3 py-2 text-left hover:opacity-70 transition-opacity"
                                        style={{
                                            color: currentTheme === themeName ? 'var(--theme-primary)' : 'var(--theme-text)',
                                            backgroundColor: currentTheme === themeName ? 'var(--theme-border)' : 'transparent'
                                        }}
                                        onClick={() => handleThemeChange(themeName)}
                                    >
                                        {themeDisplayNames[themeName]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right side */}

                <div className="hidden sm:flex items-center space-x-2" style={{color: 'var(--theme-muted)'}}>
                    <div className="w-2 h-2 rounded-full animate-pulse"
                         style={{backgroundColor: 'var(--theme-primary)'}}></div>
                    <span>{new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }).replace(/,/g, '')} {new Date().toLocaleTimeString('en-US', {
                        hour12: true,
                        hour: 'numeric',
                        minute: '2-digit'
                    })}</span>
                </div>

            </div>

            {/* Click outside to close dropdown */}
            {isThemeDropdownOpen && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsThemeDropdownOpen(false)}
                />
            )}
        </footer>
    );
};

export default Footer;