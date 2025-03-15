import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg width="50" height="50" {...props} viewBox="0 0 53 53" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 51V1C13.0755 1 15.2558 12.6773 14.8365 18.5159L32.761 1H51L1 51Z" />
            <path d="M51 51L29.3019 29.0255C20.4969 42.8924 30.0356 49.453 35.9057 51H51Z" />
            <path d="M1 51V1C13.0755 1 15.2558 12.6773 14.8365 18.5159L32.761 1H51L1 51Z" />
            <path d="M51 51L29.3019 29.0255C20.4969 42.8924 30.0356 49.453 35.9057 51H51Z" />
        </svg>
    );
}
