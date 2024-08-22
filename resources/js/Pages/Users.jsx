import CreateUserModal from "@/Components/user/CreateUserModal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Users({ auth, users }) {
    const [createUserModal, setCreateUserModal] = useState(false);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="my-4 flex items-center justify-between">
                        <h1 className="font-bold text-xl">Users</h1>
                        <button
                            onClick={() => setCreateUserModal(true)}
                            className="btn btn-primary"
                        >
                            Create New User
                        </button>
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {users?.map((item) => (
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
                                                        {item.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item?.email}</td>
                                        <td>{item.role}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">
                                                details
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <CreateUserModal
                open={createUserModal}
                setOpen={setCreateUserModal}
            />
        </AuthenticatedLayout>
    );
}
