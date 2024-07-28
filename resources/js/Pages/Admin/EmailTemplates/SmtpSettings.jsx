import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import CreateSmtpConfigModal from "../../../Components/smtp-config/CreateSmtpConfigModal";

const SmtpSettings = ({ auth, smtp_settings }) => {
    const [createConfigModal, setCreateConfigModal] = useState(false);
    const [editConfigModal, setEditConfigModal] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState(null);

    const onCreateSuccess = () => {
        router.reload();
    };
    return (
        <AdminLayout title={"Smtp Config"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">Smtp</p>
                    <button
                        onClick={() => setCreateConfigModal(true)}
                        className="btn btn-outline btn-neutral btn-md"
                    >
                        Create New Config
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto mt-4">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-base-content uppercase">
                            <th>Driver</th>
                            <th>Host</th>
                            <th>Port</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Encryption</th>
                            <th>Mail From Address</th>
                            <th>Mail From Name</th>
                            <th>Status</th>
                            <th class="text-right" width="1px">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {smtp_settings?.map((smtp) => (
                            <tr key={smtp.id} scope="row">
                                <td>{smtp?.mail_driver}</td>
                                <td>{smtp?.mail_host}</td>
                                <td>{smtp?.mail_port}</td>
                                <td>{smtp?.mail_username}</td>
                                <td>{smtp?.mail_password}</td>
                                <td>{smtp?.mail_encryption}</td>
                                <td>{smtp?.mail_from_address}</td>
                                <td>{smtp?.mail_from_name}</td>
                                <td>
                                    <span class="badge badge-info badge-outline">
                                        {smtp?.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => {
                                                setEditConfigModal(true);
                                                setSelectedConfig(smtp);
                                            }}
                                            className="btn btn-sm btn-outline"
                                        >
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline btn-warning">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateSmtpConfigModal
                open={createConfigModal}
                setOpen={setCreateConfigModal}
                edit={false}
                onSuccess={onCreateSuccess}
            />
            <CreateSmtpConfigModal
                key={"edit_modal"}
                open={editConfigModal}
                setOpen={setEditConfigModal}
                edit={true}
                onSuccess={onCreateSuccess}
                smtpConfig={selectedConfig}
            />
            <br />
            <br />
        </AdminLayout>
    );
};

export default SmtpSettings;
