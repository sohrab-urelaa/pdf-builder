import { Link, Head } from "@inertiajs/react";
import { dolphineImg, rocketImg } from "../../assets/assets";
import Hero from "../Components/welcome/Hero";
import Video from "../Components/welcome/Video";
import AskedQuestion from "../Components/welcome/AskedQuestion";
import GetStarted from "../Components/welcome/GetStarted";
import PublicNavbar from "../Components/layout/PublicNavbar";
import ESigning from "../Components/welcome/ESigning";
import Footer from "../Components/layout/Footer";
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const homePageContent = window.SITE_SETTINGS.home_page;
    return (
        <div>
            <PublicNavbar user={auth?.user} />
            <div className=" max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    dangerouslySetInnerHTML={{ __html: homePageContent }}
                ></div>
                <Head title="Welcome" />
                <Hero user={auth?.user} />
                <Video />
                <ESigning />

                <AskedQuestion />
                <GetStarted />
                <Footer />
            </div>
        </div>
    );
}
