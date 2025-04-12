import AppLogoIcon from "@/components/app-logo-icon";

export default function AppLogo() {
    return (
        <>
            <div className="">
                <AppLogoIcon className="size-5 fill-primary" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Kaaryathalo</span>
            </div>
        </>
    );
}
