import { Head } from "@inertiajs/react";
import PublicNavbar from "../Components/layout/PublicNavbar";
import Footer from "../Components/layout/Footer";
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const homePageContent = window.SITE_SETTINGS?.home_page || "";
    return (
        <div>
            <PublicNavbar user={auth?.user} />
            <div className=" max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    dangerouslySetInnerHTML={{ __html: homePageContent }}
                ></div>
                <Head title="Welcome" />
                <Footer />
            </div>
        </div>
    );
}
