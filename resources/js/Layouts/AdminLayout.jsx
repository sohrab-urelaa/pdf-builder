import { Link } from "@inertiajs/react";
import { appLogoImg } from "../../assets/assets";
import ApplicationLogo from "../Components/ApplicationLogo";
import AdminNavbar from "../Components/admin/AdminNavbar";

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
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-base-100 shadow">
                <AdminNavbar user={user} title={title} />
                <div className="p-4">{children}</div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-100 text-base-content min-h-[calc(100%-65px)] mt-[65px] lg:mt-0 lg:min-h-full  w-80 p-4">
                    <li className="">
                        <ApplicationLogo
                            headerTitle={title}
                            link="/admin/home"
                        />
                    </li>
                    <hr />
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
                                                            href={subItem.link}
                                                        >
                                                            {subItem?.title}
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
                {/* <ul
                    tabindex="0"
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72"
                >
                    <li>
                        {user ? (
                            <div className="pt-4 pb-1 border-t border-gray-200 flex flex-col">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1 flex flex-col">
                                    <li>
                                        <Link
                                            className="text-lg mr-6"
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="text-lg mr-6"
                                            href={route("logout")}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link
                                    className="text-lg mr-6"
                                    data-role="app-link"
                                    data-event="Click Sign In"
                                    data-event-props='{"location":"Top Navigation"}'
                                    href={`/login`}
                                    data-event-initialized="true"
                                >
                                    <span className="flex items-center justify-center space-x-1">
                                        <img
                                            src={signinImg}
                                            className="w-[30px] h-[30px]"
                                        />
                                        <span>Sign in</span>
                                    </span>
                                </Link>
                            </>
                        )}{" "}
                    </li>
                </ul> */}
            </div>
        </div>
    );
};

export default AdminLayout;
