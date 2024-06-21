import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function SubmittedTemplates({
    auth,
    submitted_templates,
    template,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Submitted Templates
                </h2>
            }
        >
            <Head title="Submitted Templates" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="my-4 flex items-center justify-between">
                        <h1 className="font-bold text-xl">
                            Submitted Templates (${template?.title})
                        </h1>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                            />
                                        </label>
                                    </th>
                                    <th>Submitter</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {submitted_templates?.map((item) => (
                                    <tr>
                                        <th>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img
                                                            src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {item?.user?.name}
                                                        <h1>
                                                            {item?.user?.email}
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <th>
                                            <a
                                                target="_blank"
                                                href={`${item?.templated_pdf_link}`}
                                            >
                                                <button className="btn btn-primary btn-outline btn-xs">
                                                    View PDF
                                                </button>
                                            </a>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
