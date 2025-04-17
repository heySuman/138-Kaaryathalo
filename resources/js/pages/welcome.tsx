import Features from '@/pages/LandingPage/Feature';
import Header from '@/pages/LandingPage/Header';
import Hero from '@/pages/LandingPage/Hero';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Testimonials from "@/pages/LandingPage/Testimonials";
import Footer from "@/pages/LandingPage/Footer";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const role = auth?.user?.role;
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white flex justify-center flex-col items-center px-6">
                <Header role={role} auth={auth} />
                <Hero />
                <Features />
                <Testimonials/>
                <Footer/>
            </div>
        </>
    );
}
