import { Link } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";

const footerItems = [
    {
        id: 1,
        title: "SOLUTIONS",
        subNavs: [
            {
                id: 11,
                title: "Sign Documents Online",
                link: "/",
            },
            {
                id: 12,
                title: "Document Signing API",
                link: "/",
            },
            {
                id: 13,
                title: "Enterprise",
                link: "/",
            },
            {
                id: 14,
                title: "Embedding",
                link: "/",
            },
        ],
    },
    {
        id: 2,
        title: "RESOURCES",
        subNavs: [
            {
                id: 11,
                title: "Sign Documents Online",
                link: "/",
            },
            {
                id: 12,
                title: "Document Signing API",
                link: "/",
            },
            {
                id: 13,
                title: "Enterprise",
                link: "/",
            },
            {
                id: 14,
                title: "Embedding",
                link: "/",
            },
        ],
    },
    {
        id: 3,
        title: "FOR DEVELOPERS",
        subNavs: [
            {
                id: 11,
                title: "Sign Documents Online",
                link: "/",
            },
            {
                id: 12,
                title: "Document Signing API",
                link: "/",
            },
            {
                id: 13,
                title: "Enterprise",
                link: "/",
            },
            {
                id: 14,
                title: "Embedding",
                link: "/",
            },
        ],
    },
    {
        id: 4,
        title: "COMPANY",
        subNavs: [
            {
                id: 11,
                title: "Sign Documents Online",
                link: "/",
            },
            {
                id: 12,
                title: "Document Signing API",
                link: "/",
            },
            {
                id: 13,
                title: "Enterprise",
                link: "/",
            },
            {
                id: 14,
                title: "Embedding",
                link: "/",
            },
        ],
    },
    {
        id: 5,
        title: "COMMUNITY",
        subNavs: [
            {
                id: 11,
                title: "Sign Documents Online",
                link: "/",
            },
            {
                id: 12,
                title: "Document Signing API",
                link: "/",
            },
            {
                id: 13,
                title: "Enterprise",
                link: "/",
            },
            {
                id: 14,
                title: "Embedding",
                link: "/",
            },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="px-4 mx-0 md:mx-2 md:px-2">
            <div className="border-t border-base-300 flex py-8 mx-auto flex-col md:flex-row gap-8 md:gap-16 max-w-6xl">
                <div className="flex flex-col order-2 md:order-1 shrink-0">
                    <div className="pt-6 border-t border-base-30 md:pt-0 md:border-t-0">
                        <ApplicationLogo />
                        <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-4">
                            <Link
                                className="btn btn-md btn-ghost btn-outline normal-case font-medium md:w-52 text-lg"
                                href="/contact"
                            >
                                Contact Us
                            </Link>
                            <div className="flex space-x-2"></div>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-12">
                        <div className="text-sm text-neutral-700">
                            © 2024 DocuSeal LLC
                        </div>
                        <div className="text-neutral-500 text-xs">
                            Badda, Dhaka
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 flex-col md:flex-row order-1 md:order-2 flex-grow">
                    <div className="lg:flex lg:justify-between grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {footerItems.map((footerItem) => (
                            <div key={footerItem.id}>
                                <p className="text-sm md:text-xs font-extralilightght uppercase mb-4 text-neutral-400">
                                    {footerItem.title}
                                </p>
                                <ul className="space-y-2 text-neutral-600 text-md md:text-sm">
                                    {footerItem.subNavs.map((item) => (
                                        <li key={item.id}>
                                            <a href={item.link} target="_blank">
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <set-eu-link></set-eu-link>
        </footer>
    );
};

export default Footer;
