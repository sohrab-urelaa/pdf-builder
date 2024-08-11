import { Link } from "@inertiajs/react";
import { appLogoImg } from "../../assets/assets";
import ApplicationLogo from "../Components/ApplicationLogo";
import AdminNavbar from "../Components/admin/AdminNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navItems = [
    {
        id: 10,
        name: "Home",
        subModules: false,
        link: "/admin/home",
    },
    {
        id: 1,
        name: "Site Settings",
        subModules: true,
        subOptions: [
            {
                id: 2,
                image: appLogoImg,
                title: "General",
                description: "",
                link: "/admin/site-settings/general",
            },
            {
                id: 3,
                image: appLogoImg,
                title: "Header",
                description: "",
                link: "/admin/site-settings/header",
            },
            {
                id: 1,
                image: appLogoImg,
                title: "Footer",
                description: "",
                link: "/admin/site-settings/footer",
            },
        ],
    },
    {
        id: 2,
        name: "Company",
        subModules: false,
        link: "/admin/company",
    },
    {
        id: 3,
        name: "Admins",
        subModules: false,
        link: "/admin/admin-list",
    },
    {
        id: 5,
        name: "Users",
        subModules: false,
        link: "/admin/user-list",
    },
    {
        id: 4,
        name: "Plans",
        subModules: false,
        link: "/admin/plans",
    },
    {
        id: 6,
        name: "Subscriptions",
        subModules: false,
        link: "/admin/subscriptions",
    },
    {
        id: 7,
        name: "Pdf",
        subModules: true,

        subOptions: [
            {
                id: 77,
                title: "Templates",
                link: "/admin/templates",
            },
            {
                id: 78,
                title: "Submissions",
                link: "/admin/submissions",
            },
        ],
    },
    {
        id: 8,
        name: "Email",
        subModules: true,

        subOptions: [
            {
                id: 88,
                title: "Email Templates",
                link: "/admin/email-templates",
            },
            {
                id: 89,
                title: "Smtp Config",
                link: "/admin/smtp-config",
            },
            {
                id: 881,
                title: "Bulk Emailing",
                link: "/admin/bulk-emailing",
            },
        ],
    },

    {
        id: 13,
        name: "Language",
        subModules: false,
        link: "/admin/language",
    },
    {
        id: 14,
        name: "Certificates",
        subModules: false,
        link: "/admin/certificates",
    },
    // {
    //     id: 2,
    //     name: "Services",
    //     subModules: true,
    //     subOptions: [
    //         {
    //             id: 1,
    //             image: appLogoImg,
    //             title: "Audio",
    //             description: "Audio service will be provided",
    //             link: "/",
    //         },
    //         {
    //             id: 2,
    //             image: appLogoImg,
    //             title: "Video",
    //             description: "Video Service also will be provided",
    //             link: "/",
    //         },
    //     ],
    // },
];

const AdminLayout = ({ children, user, title }) => {
    return (
        <>
            <AdminNavbar user={user} title={title} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="drawer lg:drawer-open">
                    <input
                        id="my-drawer-2"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content bg-base-100 shadow">
                        <div className="p-4">{children}</div>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu bg-base-200 text-base-content min-h-[calc(100%-65px)] mt-[65px] lg:mt-0 lg:min-h-full  w-80 p-4">
                            <li>
                                {navItems.map((navItem) => {
                                    if (navItem.subModules) {
                                        return (
                                            <>
                                                <summary className="text-lg">
                                                    {navItem?.name}
                                                </summary>
                                                <ul>
                                                    {navItem?.subOptions?.map(
                                                        (subItem) => (
                                                            <li>
                                                                <Link
                                                                    className="text-lg mr-6"
                                                                    href={
                                                                        subItem.link
                                                                    }
                                                                >
                                                                    {
                                                                        subItem?.title
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        );
                                    } else {
                                        return (
                                            <Link href={`${navItem.link}`}>
                                                <summary className="text-lg">
                                                    {navItem?.name}
                                                </summary>
                                            </Link>
                                        );
                                    }
                                })}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer theme="dark" />
        </>
    );
};

export default AdminLayout;
