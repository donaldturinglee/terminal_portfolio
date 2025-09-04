import {Link} from "react-router-dom";
import {navigation} from "../../config/navigation";

const Navigation = () => {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b font-mono"
             style={{
                 backgroundColor: 'var(--theme-background)',
                 borderColor: 'var(--theme-border)'
             }}>
            <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
                {/* Terminal-style navigation */}
                <div className="flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center space-x-1 text-xs sm:text-sm">

                    </div>

                    {/* Center - Navigation links moved here */}
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                        {navigation.links.map((link, index) => (
                            <span key={link.name}>
                                {index > 0 && <span className="hidden sm:inline mr-2 sm:mr-4"
                                                    style={{color: 'var(--theme-border)'}}>|</span>}
                                {
                                    <Link
                                        to={link.path}
                                        className="hover:opacity-75 font-source tracking-wide transition-opacity"
                                        style={{color: 'var(--theme-muted)'}}
                                    >
                                        {link.name}
                                    </Link>
                                }
                            </span>
                        ))}
                    </div>

                    {/* Right side - Empty placeholder to maintain layout balance */}
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                        {/* Empty space for layout balance */}
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navigation;