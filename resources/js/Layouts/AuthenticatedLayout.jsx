import Footer from "../Components/layout/Footer";
import PublicNavbar from "../Components/layout/PublicNavbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Authenticated({ user, header, children, headerTitle }) {
    return (
        <div className="min-h-screen">
            <PublicNavbar user={user} />
            <main className="bg-base-100 max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 py-7 rounded-md mt-3">
                {children}
                <br />
                <br />
                <br />
            </main>
            <Footer />

            <ToastContainer theme="dark" />
        </div>
    );
}
