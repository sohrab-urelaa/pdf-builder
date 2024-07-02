import { Link } from "@inertiajs/react";
import { appLogoImg } from "../../assets/assets";

export default function ApplicationLogo({
    headerTitle = "DocuSeal",
    link = "/",
}) {
    const logoLink = window.SITE_SETTINGS?.site_logo;
    const siteName = window.SITE_SETTINGS?.site_name;
    return (
        <div className="flex items-center space-x-2">
            <Link href={link} className="flex items-center space-x-2">
                <img
                    src={logoLink || appLogoImg}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="text-2xl font-bold text-base-content">
                    {siteName || headerTitle}
                </div>
            </Link>
        </div>
    );
}
