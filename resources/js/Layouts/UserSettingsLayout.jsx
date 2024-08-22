import { Link } from "@inertiajs/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicNavbar from "../Components/layout/PublicNavbar";
const navItems = [
    {
        id: 1,
        name: "Profile",
        subModules: false,
        link: "/settings/profile",
    },
    {
        id: 5,
        name: "Company",
        subModules: false,
        link: "/settings/company",
    },
    {
        id: 2,
        name: "Plans",
        subModules: false,
        link: "/settings/plans",
    },
    {
        id: 3,
        name: "Users",
        subModules: false,
        link: "/settings/users",
    },
    {
        id: 4,
        name: "E-Signature",
        subModules: false,
        link: "/settings/signatures",
    },
    {
        id: 7,
        name: "Email Templates",
        subModules: false,
        link: "/settings/email-templates",
    },
    {
        id: 6,
        name: "Verify Signature",
        subModules: false,
        link: "/settings/verify-signatures",
    },
    {
        id: 5,
        name: "Payments",
        subModules: false,
        link: "/settings/payments",
    },
];

const UserSettingsLayout = ({ children, user, title }) => {
    return (
        <>
            <PublicNavbar user={user} title={title} enableMenuButton={true} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-3">
                <div className="drawer lg:drawer-open">
                    <input
                        id="user_settings_drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content bg-base-100 shadow rounded-md">
                        <div className="p-4">{children}</div>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="user_settings_drawer"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="mr-3 menu bg-base-100 rounded-md text-base-content min-h-[calc(100%-65px)] mt-[65px] lg:mt-0 lg:min-h-full  w-80 p-4">
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

export default UserSettingsLayout;
