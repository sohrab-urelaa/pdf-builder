import UserSettingsLayout from "../../Layouts/UserSettingsLayout";

const ESignature = ({ auth }) => {
    return (
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <div className="my-6 flex items-center justify-between gap-3">
                    <p className="text-4xl font-bold">Signing Certificates</p>
                    <button className="btn btn-neutral">Upload Cert</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-neutral uppercase">
                            <th>Name</th>
                            <th>Valid To</th>
                            <th>Status</th>
                            <th class="text-right" width="1px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr scope="row">
                            <td>Md Sohrab Hossain Sohel</td>
                            <td>mdsohelranask6869@gmail.com</td>
                            <td>
                                <span class="badge badge-info badge-outline">
                                    admin
                                </span>
                            </td>
                            <td class="flex items-center space-x-2 justify-end">
                                <a
                                    class="btn btn-outline btn-xs"
                                    title="Edit"
                                    data-turbo-frame="modal"
                                    href="/users/20605/edit"
                                >
                                    Edit
                                </a>{" "}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </UserSettingsLayout>
    );
};

export default ESignature;
