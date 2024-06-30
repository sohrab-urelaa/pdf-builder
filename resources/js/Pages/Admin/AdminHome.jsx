import AdminLayout from "../../Layouts/AdminLayout";

const AdminHome = ({ auth }) => {
    return (
        <AdminLayout user={auth?.user} title={"Home"}>
            <div className="text-6xl">
                tenetur. Admin Home Page Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Omnis laboriosam debitis illum ducimus saepe
                expedita enim, ut quam eaque a nostrum! Repellendus commodi
                deserunt quia ut labore totam adipisci tenetur.
            </div>
        </AdminLayout>
    );
};

export default AdminHome;
