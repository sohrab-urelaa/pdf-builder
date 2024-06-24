import { Link } from "@inertiajs/react";
import { appLogoImg } from "../../assets/assets";

export default function ApplicationLogo({ headerTitle = "DocuSeal" }) {
    return (
        <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
                <img src={appLogoImg} className="w-[50px] h-[50px]" />
                <div className="text-2xl font-bold text-base-content">
                    {headerTitle}
                </div>
            </Link>
        </div>
    );
}
