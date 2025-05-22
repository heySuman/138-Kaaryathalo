import { useState } from 'react';

export default function ExpandableImage({ src, alt }:{src: string, alt: string}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Thumbnail */}
            <img
                src={src}
                alt={alt}
                className="w-64 cursor-pointer rounded shadow-md"
                onClick={() => setIsOpen(true)}
            />

            {/* Fullscreen Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                    onClick={() => setIsOpen(false)}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="max-h-[90%] max-w-[90%] rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
