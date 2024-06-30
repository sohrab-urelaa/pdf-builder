import { Link } from "@inertiajs/react";
import { rocketImg } from "../../../assets/assets";
const Hero = ({ user }) => {
    return (
        <div className="hero  min-h-screen">
            <div className="hero-content text-center">
                <div className="">
                    <h1 className="text-6xl font-extrabold text-base-content">
                        Document Signing{" "}
                        <span className="text-yellow">for Everyone</span>
                    </h1>
                    <p className="py-6 w-full md:w-[60%] mx-auto text-xl">
                        Free forever for individuals, extensible for businesses
                        and developers.
                        <span className="text-base-content font-bold">
                            {" "}
                            #1 Open Source Alternative
                        </span>{" "}
                        to DocuSign, PandaDoc and more.
                    </p>
                    {user ? (
                        <Link href="/dashboard">
                            <button className="btn btn-neutral px-5 text-xl">
                                <img
                                    className="h-[30px] w-[30px]"
                                    src={rocketImg}
                                />
                                LET'S START
                            </button>
                        </Link>
                    ) : (
                        <Link href="/register">
                            <button className="btn btn-neutral px-5 text-xl">
                                <img
                                    className="h-[30px] w-[30px]"
                                    src={rocketImg}
                                />
                                CREATE FREE ACCOUNT
                            </button>
                        </Link>
                    )}

                    <p className="py-6 w-full md:w-[60%] font-extrabold mx-auto text-4xl text-base-content">
                        <span className="text-yellow">29.2k</span> businesses
                        and individuals have signed with to DocuSign, PandaDoc
                        and more.
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                        {[...new Array(3)].map((item) => (
                            <div className="card  grow basis-[320px] bg-base-300 shadow-sm">
                                <div className="card-body items-start">
                                    <h2 className="card-title text-left font-normal text-[1rem]">
                                        I was using Docusign until yesterday
                                        when I realized it was not at all
                                        meeting my needs. DocuSeal has already
                                        been better than Docusign so I'm
                                        switching.
                                    </h2>
                                    <p>
                                        <span className="font-bold">
                                            BRIAN LEE
                                        </span>{" "}
                                        | Accountant
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
