import Footer from "../Components/layout/Footer";
import PublicNavbar from "../Components/layout/PublicNavbar";

export default function Authenticated({ user, header, children, headerTitle }) {
    return (
        <div className="min-h-screen">
            <PublicNavbar user={user} />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
