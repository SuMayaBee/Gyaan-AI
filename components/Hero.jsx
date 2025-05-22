import Link from "next/link"; 
import { Button } from "./ui/button";

const HeroSection = () => {
    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center hero-bg text-center relative">
            <div className="absolute inset-0 overflow-hidden">
                <div className="animate-float absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="animate-float absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between w-full max-w-6xl p-4 mb-8">
                    <div className="glass-effect px-6 py-2 rounded-full text-center mx-auto">
                        <span className="text-white/90 text-sm font-medium">✨ AI Generator Membership - Join Now</span>
                    </div>
                </div>

                <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
                    AI-Powered Course <br/>
                    <span className="gradient-text bg-gradient-to-r from-purple-200 to-pink-100">Creation</span>
                </h1>

                <p className="mt-6 text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
                    Revolutionize your content creation with our AI-powered app, 
                    delivering engaging and high-quality courses in seconds.
                </p>

                <Link href='/dashboard/'>
                    <Button
                        className="glass-effect hover:bg-white/20 py-6 px-8 text-white text-xl 
                        transition-all duration-300 hover:scale-105 hover:shadow-lg 
                        border border-white/20 rounded-full"
                    >
                        Get started →
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
