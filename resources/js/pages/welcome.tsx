import Features from '@/pages/LandingPage/Feature';
import Footer from '@/pages/LandingPage/Footer';
import Header from '@/pages/LandingPage/Header';
import Hero from '@/pages/LandingPage/Hero';
import Testimonials from '@/pages/LandingPage/Testimonials';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const role = auth?.user?.role;
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="relative min-h-screen overflow-hidden bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                {/* Page content */}
                <Header role={role} auth={auth} />
                <Hero />
                <Features />
                <Testimonials />
                <Footer />
            </div>
        </>
    );
}
