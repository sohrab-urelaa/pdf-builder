import { TiThMenuOutline } from "react-icons/ti";
import { menu1Img, menu2Img } from "../../assets/assets";
import { MdOutlineAdd } from "react-icons/md";

import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import CreateTemplateModal from "../Components/home/CreateTemplateModal";
import { useState } from "react";

const DashboardSubHeading = ({ title }) => {
    const [createTemplateModal, setCreateTemplateModal] = useState(false);

    return (
        <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-base-200 w-[fit-content] px-1 py-1 rounded-lg">
                    <NavLink
                        className="hover:decoration-inherit"
                        href={route("dashboard")}
                    >
                        <div
                            className={`${
                                route().current("dashboard")
                                    ? " bg-base-300  text-base-content  "
                                    : ""
                            } cursor-pointer rounded-md px-2 py-1`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6 stroke-2"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                ></path>
                                <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                                <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                                <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                                <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                            </svg>
                        </div>
                    </NavLink>
                    <NavLink
                        className="hover:decoration-inherit"
                        href={route("submissions")}
                    >
                        <div
                            className={`${
                                route().current("submissions")
                                    ? " bg-base-300  text-base-content  "
                                    : ""
                            } cursor-pointer rounded-md px-2 py-1`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6 stroke-2"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                ></path>
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            </svg>
                        </div>
                    </NavLink>
                </div>
                <h1 className="text-4xl text-base-content font-extrabold ml-2">
                    {title}
                </h1>
            </div>
            <div>
                {/* <Link href={route("template-builder")}> */}
                <button
                    onClick={() => setCreateTemplateModal(true)}
                    className="btn  btn-outline font-xl"
                >
                    <span>
                        <MdOutlineAdd size={23} />
                    </span>
                    Create New
                </button>
                {/* </Link> */}
            </div>
            <CreateTemplateModal
                open={createTemplateModal}
                setOpen={setCreateTemplateModal}
            />
        </div>
        // <div className="btn rounded-md">
        //     <button className="btn p-4 btn-md">
        //         <img className="h-full" src={menu2Img} alt="" />
        //     </button>
        //     <button className="btn btn-md p-4">
        //         <img className="h-full" src={menu1Img} alt="" />
        //     </button>
        // </div>
    );
};

export default DashboardSubHeading;
