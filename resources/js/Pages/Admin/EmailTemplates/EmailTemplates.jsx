import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

const EmailTemplates = ({ auth, email_templates }) => {
    const [emailTemplates, setEmailTemplates] = useState(email_templates);

    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">Email Templates</p>
                </div>
            </div>
            <div class="overflow-x-auto mt-4">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-base-content uppercase">
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Template</th>
                            <th class="text-right" width="1px">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emailTemplates?.map((template) => (
                            <tr key={template.id} scope="row">
                                <td>{template?.name}</td>
                                <td>{template?.subject}</td>
                                <td>
                                    <span class="badge badge-info badge-outline">
                                        {template?.status}
                                    </span>
                                </td>
                                <td>{template?.body}</td>
                                <td>
                                    <Link
                                        href={`/admin/edit-email-templates/${template.id}`}
                                    >
                                        <button className="btn btn-sm btn-outline">
                                            Edit
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <br />
        </AdminLayout>
    );
};

export default EmailTemplates;
