import { Link } from "@inertiajs/react";
import { appLogoImg, signinImg } from "../../../assets/assets";
import Dropdown from "../Dropdown";
import ResponsiveNavLink from "../ResponsiveNavLink";
const navItems = [
    {
        id: 1,
        name: "Home",
        subModules: false,
        link: "/",
    },
    {
        id: 2,
        name: "Services",
        subModules: true,
        subOptions: [
            {
                id: 1,
                image: appLogoImg,
                title: "Audio",
                description: "Audio service will be provided",
                link: "/",
            },
            {
                id: 2,
                image: appLogoImg,
                title: "Video",
                description: "Video Service also will be provided",
                link: "/",
            },
        ],
    },
];

const PublicNavbar = ({ user }) => {
    return (
        <nav className="sticky z-10 top-0 bg-base-100 bg-opacity-95 py-2 px-2 md:px-4">
            <div className="max-w-6xl m-auto flex justify-between items-center">
                <div className="flex items-center w-1/4">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src={appLogoImg}
                                className="w-[50px] h-[50px]"
                            />
                            <div className="text-2xl font-bold text-base-content">
                                DocuSeal
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="text-center items-center justify-center space-x-4 hidden lg:flex w-1/3">
                    {navItems.map((navItem) => {
                        if (navItem?.subModules) {
                            return (
                                <div
                                    key={navItem.id}
                                    className="dropdown dropdown-start dropdown-hover"
                                >
                                    <label
                                        tabindex="0"
                                        className="inline-flex items-center justify-center font-medium cursor-pointer"
                                    >
                                        {navItem.name}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 ml-1 stroke-2"
                                            width="44"
                                            height="44"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="#000000"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                stroke="none"
                                                d="M0 0h24v24H0z"
                                                fill="none"
                                            ></path>
                                            <path d="M6 9l6 6l6 -6"></path>
                                        </svg>
                                    </label>
                                    <div className="dropdown-content pt-4 z-10">
                                        <ul
                                            tabindex="0"
                                            className="z-[1] menu p-2 shadow bg-base-100 rounded-box w-96"
                                        >
                                            <li className="w-full">
                                                {navItem.subOptions.map(
                                                    (subNav) => (
                                                        <Link
                                                            className="text-normal"
                                                            rel="noopener noreferrer nofollow"
                                                            data-role="app-link"
                                                            href={subNav.link}
                                                        >
                                                            <img
                                                                src={
                                                                    subNav.image
                                                                }
                                                                className="w-[50px] h-[50px]"
                                                            />
                                                            <div>
                                                                <span className="font-bold">
                                                                    {
                                                                        subNav.title
                                                                    }
                                                                </span>
                                                                <p className="font-medium">
                                                                    {
                                                                        subNav.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    )
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex">
                                    <Link
                                        className="font-medium"
                                        href={navItem?.link}
                                    >
                                        Pricing
                                    </Link>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="flex items-center justify-end w-1/4">
                    {user ? (
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <button className="btn btn-ghost text-xl">
                                Settings
                            </button>
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-12">
                                                    <span>
                                                        {" "}
                                                        {user.name
                                                            ?.trim()
                                                            ?.substring(0, 2)}
                                                    </span>
                                                </div>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link
                                className="font-medium text-lg mr-6 hidden lg:inline"
                                href={"/login"}
                            >
                                <span className="flex items-center justify-center space-x-1">
                                    <img
                                        src={signinImg}
                                        className="w-[30px] h-[30px]"
                                    />
                                    <span>Sign in</span>
                                </span>
                            </Link>
                            <Link
                                className="btn btn-neutral text-white flex items-center justify-center"
                                data-role="app-link"
                                data-event="Click Sign Up"
                                data-event-props='{"location":"Top Navigation"}'
                                href={"/register"}
                                data-event-initialized="true"
                            >
                                <span className="flex text-lg !normal-case !font-medium">
                                    Get Started
                                </span>
                            </Link>
                        </>
                    )}
                    <div className="dropdown dropdown-end lg:hidden">
                        <label
                            tabindex="0"
                            className="ml-1 btn btn-ghost btn-circle"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                ></path>
                            </svg>
                        </label>
                        <ul
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
                                    }
                                })}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
