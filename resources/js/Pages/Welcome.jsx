import { Link, Head } from "@inertiajs/react";
import { dolphineImg, rocketImg } from "../../assets/assets";
import Hero from "../Components/welcome/Hero";
import Video from "../Components/welcome/Video";
import AskedQuestion from "../Components/welcome/AskedQuestion";
import GetStarted from "../Components/welcome/GetStarted";
import PublicNavbar from "../Components/layout/PublicNavbar";
import ESigning from "../Components/welcome/ESigning";
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div className=" max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PublicNavbar user={auth?.user} />
            <Head title="Welcome" />
            <Hero user={auth?.user} />
            <Video />
            <ESigning />

            <AskedQuestion />
            <GetStarted />
        </div>
    );
}
