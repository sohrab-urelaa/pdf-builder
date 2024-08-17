import { Link } from "@inertiajs/react";
import { appLogoImg } from "../../assets/assets";
import ApplicationLogo from "../Components/ApplicationLogo";
import AdminNavbar from "../Components/admin/AdminNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const navItemList = [
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
            {
                id: 4,
                image: appLogoImg,
                title: "Fonts",
                description: "",
                link: "/admin/site-settings/font",
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
    {
        id: 15,
        name: "Payment Getway",
        subModules: true,
        subOptions: [
            {
                id: 150,
                title: "Payment Getway By Countries",
                link: "/admin/payment-getway/home",
            },
            {
                id: 151,
                title: "My Fatoorah",
                link: "/admin/payment-getway/my-fatoorah",
            },
        ],
    },
    {
        id: 16,
        name: "Country",
        subModules: false,
        link: "/admin/country",
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
    const [navItems, setNavItems] = useState(navItemList);

    const handleNavExpand = (navItemId) => {
        setNavItems((prev) => {
            const updatedNav = prev.map((item) => {
                if (item.id === navItemId) {
                    return {
                        ...item,
                        expanded: !item?.expanded,
                    };
                }
                return item;
            });
            return updatedNav;
        });
    };
    return (
        <>
            <AdminNavbar user={user} title={title} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-3">
                <div className="drawer lg:drawer-open">
                    <input
                        id="my-drawer-2"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content bg-base-100 shadow">
                        <div className="p-4">{children}</div>
                    </div>
                    <div className="drawer-side mr-3">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu bg-base-100 text-base-content min-h-[calc(100%-65px)] mt-[65px] lg:mt-0 lg:min-h-full  w-80 p-4">
                            <li>
                                {navItems.map((navItem) => {
                                    if (navItem.subModules) {
                                        return (
                                            <>
                                                <summary
                                                    onClick={() =>
                                                        handleNavExpand(
                                                            navItem.id
                                                        )
                                                    }
                                                    className="text-lg w-full flex items-center justify-between"
                                                >
                                                    <div>{navItem?.name}</div>
                                                    <IoIosArrowDown />
                                                </summary>
                                                <ul
                                                    style={{
                                                        display:
                                                            navItem?.expanded
                                                                ? "block"
                                                                : "none",
                                                    }}
                                                >
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
