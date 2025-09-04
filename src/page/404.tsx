import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const [countdown, setCountdown] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        window.history.back();
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
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                        {/* Error Code */}
                        <div className="mb-8">
                            <h1 className="text-8xl sm:text-9xl font-bold text-blue-400 mb-4">
                                404
                            </h1>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={handleGoHome}
                                className="bg-green-600 hover:bg-green-700 border border-green-600 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer font-semibold"
                            >
                                <span className="text-gray-300">$ </span>cd ~
                            </button>
                            <button
                                onClick={handleGoBack}
                                className="bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer font-semibold"
                            >
                                <span className="text-gray-300">$ </span>cd ..
                            </button>
                        </div>

                        {/* Countdown Progress Bar */}
                        <div className="mt-8 w-full max-w-md">
                            <div className="bg-gray-700 rounded-full h-2 mb-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                                    style={{width: `${((10 - countdown) / 10) * 100}%`}}
                                ></div>
                            </div>
                            <div className="text-gray-400 text-sm text-center">
                                Auto-redirect progress: {Math.round(((10 - countdown) / 10) * 100)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;