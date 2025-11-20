import React, { useState, useEffect } from 'react';

const Home = () => {
    const [progress, setProgress] = useState(65);
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('EN');

    useEffect(() => {
        // Add Font Awesome CSS dynamically
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);

        // Animate progress bar after component mounts
        const timer = setTimeout(() => {
            setProgress(75);
        }, 500);

        return () => {
            clearTimeout(timer);
            // Clean up the dynamically added stylesheet
            const existingLink = document.querySelector('link[href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"]');
            if (existingLink) {
                document.head.removeChild(existingLink);
            }
        };
    }, []);

    const toggleLanguageMenu = () => {
        setIsLanguageMenuOpen(!isLanguageMenuOpen);
    };

    const selectLanguage = (languageCode, languageName) => {
        setCurrentLanguage(languageCode);
        setIsLanguageMenuOpen(false);
        alert(`Language changed to ${languageName}`);
    };

    const handleCardClick = (title) => {
        alert(`Opening ${title} section...`);
    };

    const features = [
        {
            icon: 'fas fa-traffic-light',
            title: 'Traffic Signs',
            description: 'Learn all mandatory, warning, and information signs used on Lebanese roads.',
            buttonText: 'Explore Signs',
            buttonColor: 'bg-[#ED1C24] hover:bg-[#c21820]',
            iconColor: 'text-[#ED1C24]',
            bgColor: 'bg-[#ED1C24]/10'
        },
        {
            icon: 'fas fa-question-circle',
            title: 'Traffic Questions',
            description: 'Practice with official exam questions and test your knowledge of traffic rules.',
            buttonText: 'Start Practice',
            buttonColor: 'bg-[#00A651] hover:bg-[#008e48]',
            iconColor: 'text-[#00A651]',
            bgColor: 'bg-[#00A651]/10'
        },
        {
            icon: 'fas fa-desktop',
            title: 'Test Simulator',
            description: 'Simulate the actual exam experience with our realistic test simulator.',
            buttonText: 'Take Test',
            buttonColor: 'bg-[#3b82f6] hover:bg-[#2563eb]',
            iconColor: 'text-[#3b82f6]',
            bgColor: 'bg-[#3b82f6]/10'
        },
        {
            icon: 'fas fa-car',
            title: 'Car Parts',
            description: 'Learn about essential car components and their functions for your exam.',
            buttonText: 'Study Parts',
            buttonColor: 'bg-[#9333ea] hover:bg-[#7c3aed]',
            iconColor: 'text-[#9333ea]',
            bgColor: 'bg-[#9333ea]/10'
        }
    ];

    const languages = [
        { code: 'EN', name: 'English', flag: '🇺🇸' },
        { code: 'AR', name: 'Arabic (العربية)', flag: '🇱🇧' },
        { code: 'FR', name: 'French (Français)', flag: '🇫🇷' }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-sans">
            {/* Background container */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div
                    className="w-full h-full absolute top-0 left-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('bg-car1.jpg')" }}
                >
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
            </div>

            {/* Language Selector Dropdown */}
            <div className="absolute top-5 right-5 z-10">
                <div className="relative inline-block text-left">
                    <button
                        onClick={toggleLanguageMenu}
                        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED1C24]"
                    >
                        <span className="text-sm font-medium text-gray-700">{currentLanguage}</span>
                        <i className={`fas fa-chevron-down text-xs text-gray-500 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}></i>
                    </button>

                    <div
                        className={`${isLanguageMenuOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 transform origin-top-right`}
                    >
                        <div className="py-1">
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    onClick={() => selectLanguage(language.code, language.name)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#ED1C24] transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <span className="mr-2">{language.flag}</span>
                                        <span>{language.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-1 w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#ED1C24] to-[#c21820] text-white py-8 px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">DARSNE</h1>
                    <p className="text-xl md:text-2xl opacity-90">Lebanese Driving Exam Guide</p>
                    <div className="mt-6 flex justify-center space-x-4">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">Traffic Signs</div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">Test Simulator</div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">Car Parts</div>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="bg-[#F4E3C9] py-4 px-6 flex items-center">
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-2.5">
                        <div
                            className="bg-[#00A651] h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-700">{progress}% Complete</span>
                </div>

                {/* Main Content */}
                <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center ">
                        <i className="fas fa-road mr-3 text-[#ED1C24]"></i>
                        Traffic Signs & Questions
                    </h2>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                                onClick={() => handleCardClick(feature.title)}
                            >
                                <div className="flex items-start mb-4">
                                    <div className={`${feature.bgColor} p-3 rounded-lg`}>
                                        <i className={`${feature.icon} ${feature.iconColor} text-2xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 ml-4 py-3">{feature.title}</h3>
                                </div>
                                <p className="text-gray-600 mb-4">{feature.description}</p>
                                <button
                                    className={`${feature.buttonColor} text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300`}
                                >
                                    {feature.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-2">
                        <button
                            className="flex-1 bg-[#ED1C24] hover:bg-[#c21820] text-white py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center"
                        >
                            <i className="fas fa-bolt mr-2"></i>
                            Quick Test
                        </button>
                        <button
                            className="flex-1 bg-white hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium transition duration-300 border border-gray-200 flex items-center justify-center"
                        >
                            <i className="fas fa-book-open mr-2"></i>
                            Study Guide
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-6 px-6 text-center">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="font-bold text-lg">Credits</h3>
                            <p className="text-gray-300">Nour Saneh</p>
                        </div>
                        <div className="flex items-center">
                            {/* Lebanon Flag */}
                            <div className="w-6 h-4 bg-gradient-to-b from-[#ED1C24] via-white to-[#ED1C24] relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-3 h-2 bg-[#00A651]" style={{
                                        clipPath: 'polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)'
                                    }}></div>
                                </div>
                            </div>
                            <span className="ml-2 font-medium">LEBANON</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;