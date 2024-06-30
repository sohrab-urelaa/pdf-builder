import { Link } from "@inertiajs/react";
import { appLogoImg, signinImg } from "../../../assets/assets";
import Dropdown from "../Dropdown";
import ResponsiveNavLink from "../ResponsiveNavLink";
import ApplicationLogo from "../ApplicationLogo";
import { MdOutlineMenu } from "react-icons/md";

const AdminNavbar = ({ user, title }) => {
    return (
        <nav className="sticky z-10 top-0 bg-base-100 bg-opacity-95 py-2 px-1 md:px-5">
            <div className="w-full px-1 md:px-5 m-auto flex justify-between items-center">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-ghost drawer-button lg:hidden"
                >
                    <MdOutlineMenu size={22} />
                </label>
                <div className="flex items-center w-1/4">
                    <div className="flex items-center space-x-2">
                        <ApplicationLogo
                            headerTitle={title}
                            link="/admin/home"
                        />
                    </div>
                </div>
                <div className="text-center items-center justify-center space-x-4 hidden lg:flex w-1/3"></div>
                <div className="flex items-center justify-end w-1/4">
                    {user ? (
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
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
                        <></>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
