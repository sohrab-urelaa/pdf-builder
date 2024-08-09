import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DashboardSubHeading from "../Layouts/DashboardSubHeading";
import { CiCalendar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GrClone } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import formatDateString from "../lib/date-formate";
export default function Dashboard({ auth, templates }) {
    const handleCopyLink = (template) => {
        const link = `${window.origin}/submit-templates/${template.id}`;
        navigator.clipboard
            .writeText(link)
            .then(() => {
                console.log("Text copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    console.log("Templates", templates);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <DashboardSubHeading title={"Templates"} />

                <div className="flex items-center gap-4 flex-wrap mt-4">
                    {templates.map((item) => (
                        <div className="basis-[300px] grow bg-base-200 p-6 rounded-lg">
                            <div className="flex justify-between gap-2">
                                <div>
                                    <Link
                                        href={`/submitted-templates/${item.id}`}
                                    >
                                        <h1 className="text-xl text-base-content font-extrabold">
                                            {item?.title}
                                        </h1>
                                    </Link>
                                    <div className="mt-4">
                                        <p
                                            className="flex items-center gap-2 text-[14px] tooltip"
                                            data-tip="Author"
                                        >
                                            <span>
                                                <FaRegUser color="text-base-content" />
                                            </span>
                                            {item?.owner?.name}
                                        </p>
                                        <p
                                            className="flex items-center gap-2 text-[14px] tooltip"
                                            data-tip="Created At"
                                        >
                                            <span>
                                                <CiCalendar color="text-base-content" />
                                            </span>
                                            {formatDateString(item?.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        onClick={() => handleCopyLink(item)}
                                        className="btn btn-ghost btn-sm tooltip"
                                        data-tip="Copy Link"
                                    >
                                        <FaRegCopy />
                                    </button>
                                    <button
                                        className="btn btn-ghost btn-sm tooltip"
                                        data-tip="Delete"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                    <button
                                        className="btn  btn-ghost btn-sm tooltip"
                                        data-tip="Clone"
                                    >
                                        <GrClone />
                                    </button>
                                    <Link href={`/template-builder/${item.id}`}>
                                        <button
                                            className="btn btn-ghost btn-sm tooltip"
                                            data-tip="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
