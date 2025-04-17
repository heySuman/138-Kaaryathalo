import SectionTitle from '@/pages/LandingPage/SectionTitle';
import {User2} from "lucide-react";

export type Testimonial = {
    id: number;
    name: string;
    designation: string;
    content: string;
    star: number;
};

const testimonialData: Testimonial[] = [
    {
        id: 1,
        name: 'Master Roshi',
        designation: 'Master @DBZ',
        content: "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
        star: 5,
    },
    {
        id: 2,
        name: 'David Kale',
        designation: 'Founder @Kale',
        content: "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
        star: 5,
    },
    {
        id: 3,
        name: 'Sundar Pichi',
        designation: 'CE0 @Google',
        content: "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
        star: 5,
    },
];

const Testimonials = () => {
    return (
        <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28">
            <div className="container">
                <SectionTitle
                    title="What Our Users Says"
                    paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
                    center
                />

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    {testimonialData.map((testimonial) => (
                        <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const starIcon = (
    <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
        <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
    </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
    const { star, name, content, designation } = testimonial;

    const ratingIcons = [];
    for (let index = 0; index < star; index++) {
        ratingIcons.push(
            <span key={index} className="text-yellow">
                {starIcon}
            </span>,
        );
    }

    return (
        <div className="w-full">
            <div className="shadow-two hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark rounded-xs bg-white p-8 duration-300 lg:px-5 xl:px-8">
                <div className="mb-5 flex items-center space-x-1">{ratingIcons}</div>
                <p className="border-body-color/10 text-body-color mb-8 border-b pb-8 text-base leading-relaxed dark:border-white/10 dark:text-white">
                    “{content}
                </p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border">
                        <User2/>
                    </div>
                    <div className="w-full">
                        <h3 className="text-dark mb-1 text-lg font-semibold lg:text-base xl:text-lg dark:text-white">{name}</h3>
                        <p className="text-body-color text-sm">{designation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
