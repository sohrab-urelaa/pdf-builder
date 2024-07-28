import Footer from "../Components/layout/Footer";
import PublicNavbar from "../Components/layout/PublicNavbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Authenticated({ user, header, children, headerTitle }) {
    return (
        <div className="min-h-screen">
            <PublicNavbar user={user} />
            <main>{children}</main>
            <Footer />

            <ToastContainer theme="dark" />
        </div>
    );
}
