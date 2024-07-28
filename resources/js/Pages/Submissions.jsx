import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DashboardSubHeading from "../Layouts/DashboardSubHeading";
import { CiCalendar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineDownload } from "react-icons/ai";
import formatDateString from "../lib/date-formate";
import { MdDeleteOutline } from "react-icons/md";
import rawPdf from "./sohrab2.pdf";
export default function Dashboard({ auth, templates }) {
    const downloadPdf = async (submitted_template) => {
        try {
            const name = `${submitted_template?.parent_template?.title}-${submitted_template?.submitted_user_name}`;
            // Fetch the PDF file
            const response = await fetch(rawPdf);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Get the blob from the response
            const blob = await response.blob();

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element
            const a = document.createElement("a");
            a.href = url;
            a.download = name; // Set the desired file name
            document.body.appendChild(a);
            a.click();

            // Clean up the URL object and remove the link element
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading the PDF", error);
        }
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <DashboardSubHeading title={"Submissions"} />
                <div className="flex flex-col gap-4 mt-4">
                    {templates.map((item) => (
                        <div className="bg-base-200 p-6 rounded-lg">
                            <div className="flex justify-between gap-2">
                                <div>
                                    <p
                                        className="flex text-base-content font-bold items-center gap-2 text-[18px] mb-3 tooltip"
                                        data-tip="Document Title"
                                    >
                                        <span>
                                            <IoDocumentTextOutline color="text-base-content" />
                                        </span>
                                        {item?.parent_template?.title}
                                    </p>
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
                                        {formatDateString(
                                            item?.parent_template?.created_at
                                        )}
                                    </p>
                                </div>
                                <div className="flex">
                                    <p
                                        className="flex text-base-content font-bold items-center gap-2 text-[22px] tooltip"
                                        data-tip={item?.submitted_user_name}
                                    >
                                        {item?.submitted_user_email}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => downloadPdf(item)}
                                        className="btn btn-neutral btn-sm font-bold text-white"
                                    >
                                        <span>
                                            <AiOutlineDownload size={22} />
                                        </span>
                                        DOWNLOAD
                                    </button>
                                    <a
                                        href={item?.templated_pdf_link}
                                        target="_blank"
                                    >
                                        <button className="btn btn-neutral btn-outline btn-sm font-bold">
                                            VIEW
                                        </button>
                                    </a>
                                    <button className="btn btn-neutral btn-outline btn-sm font-bold ">
                                        <MdDeleteOutline size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
            </div>
        </AuthenticatedLayout>
    );
}
