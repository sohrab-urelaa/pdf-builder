import { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import Pagination from "../../Components/utill/Pagination";
import { downloadPdf } from "../../lib/downloadFile";
import formatDateString from "../../lib/date-formate";

import { CiCalendar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineDownload } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

const AdminPdfSubmissions = ({ auth, data }) => {
    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">
                        Pdf Submissions ({data?.total})
                    </p>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    {data?.data?.map((item) => (
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
                                        data-tip={item?.user?.name}
                                    >
                                        {item?.user?.email}
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
                <Pagination links={data?.links} />
            </div>

            <br />
        </AdminLayout>
    );
};

export default AdminPdfSubmissions;
