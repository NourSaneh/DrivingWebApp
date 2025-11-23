import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';

const Home = ({ onNavigate }) => {
    const [progress, setProgress] = useState(65);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(75);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleCardClick = (title) => {
        if (title === 'Study Guide') {
            onNavigate && onNavigate('studyguide');
            return;
        }
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

    return (
        <Layout>

            {/* PROGRESS BAR */}
            <div className="bg-[#F4E3C9] py-4 px-6 flex items-center rounded-xl mb-6">
                <div className="w-full bg-white/50 rounded-full h-2.5">
                    <div
                        className="bg-[#00A651] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700 font-[Montserrat]">
                    {progress}%
                </span>
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center heading">
                <i className="fas fa-road mr-3 text-[#ED1C24]"></i>
                Traffic Signs & Questions
            </h2>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border border-gray-100 shadow-md transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                        onClick={() => handleCardClick(feature.title)}
                    >
                        <div className="flex items-start mb-4">
                            <div className={`${feature.bgColor} p-3 rounded-lg`}>
                                <i className={`${feature.icon} ${feature.iconColor} text-2xl`}></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 ml-4 py-3 heading">
                                {feature.title}
                            </h3>
                        </div>

                        <p className="text-gray-600 mb-4 font-[Montserrat]">
                            {feature.description}
                        </p>

                        <button
                            className={`${feature.buttonColor} text-white px-4 py-2 rounded-lg text-sm font-medium font-[Montserrat]`}
                        >
                            {feature.buttonText}
                        </button>
                    </div>
                ))}
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-2">
                <button className="flex-1 bg-[#ED1C24] hover:bg-[#c21820] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center font-[Montserrat]">
                    <i className="fas fa-bolt mr-2"></i>
                    Quick Test
                </button>

                <button
                    onClick={() => handleCardClick('Study Guide')}
                    className="flex-1 bg-white hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium border flex items-center justify-center font-[Montserrat]"
                >
                    <i className="fas fa-book-open mr-2"></i>
                    Study Guide
                </button>
            </div>

        </Layout>
    );
};

export default Home;
