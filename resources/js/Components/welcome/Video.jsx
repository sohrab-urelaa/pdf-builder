const Video = () => {
    return (
        <section className="mt-16">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-5/12 md:pr-8 order-1 md:order-1">
                    <div className="bg-base-200/50 rounded-xl p-6">
                        <h2 className="flex space-x-3 items-center text-2xl font-bold text-neutral-700 leading-normal">
                            <span className="flex rounded-lg bg-blue-400 p-2 w-12 h-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white"
                                    width="44"
                                    height="44"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    ></path>
                                    <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3"></path>
                                    <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3"></path>
                                    <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7"></path>
                                    <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1"></path>
                                    <path d="M17 12h.01"></path>
                                    <path d="M13 12h.01"></path>
                                </svg>
                            </span>
                            <span className="text-base-content">
                                Create document form
                            </span>
                        </h2>
                        <p className="text-lg leading-relaxed mt-4 text-base-content">
                            Turn your documents into fillable forms with 10
                            field types available.
                        </p>
                    </div>
                    <div className="bg-base-200/50 rounded-xl p-6 mt-4">
                        <h2 className="text-2xl flex space-x-3 items-center text-base-content mb-2 font-bold leading-normal">
                            <span className="flex rounded-lg bg-green-400 p-2 w-12 h-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white"
                                    width="44"
                                    height="44"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    ></path>
                                    <path d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5"></path>
                                    <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"></path>
                                    <path d="M16 7h4"></path>
                                </svg>
                            </span>
                            <span className="text-base-content">
                                Sign documents
                            </span>
                        </h2>
                        <p className="text-lg leading-relaxed mt-4 text-base-content">
                            Sign documents yourself or invite multiple parties
                            via email or text to sign.
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-7/12 mb-8 mt-4 lg:mt-0 order-2 md:order-2">
                    <div className="relative w-full">
                        <div
                            id="watch"
                            className="relative overflow-hidden border border-base-300 border border-8 border-base-300 rounded-xl"
                        >
                            <set-video-modal data-trigger-id="demo"></set-video-modal>
                            <a
                                id="demo"
                                className="group block relative overflow-hidden shadow-2xl"
                                data-event="Click Play Demo Video"
                                data-event-props='{"location":"Top of the landing page"}'
                                href="#demo"
                                data-event-initialized="true"
                            >
                                <div className="bg-black cursor-pointer">
                                    <img
                                        className="group-hover:opacity-40 opacity-60 transition-opacity"
                                        alt="DocuSeal Demo"
                                        src="https://www.docuseal.co/packs/static/images/demo-180bc73e5d6c29193739.jpg"
                                        width="1920"
                                        height="1013"
                                    />
                                </div>
                                <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                                    <div className="bg-white border border-base-200 rounded-full shadow-lg absolute cursor-pointer mt-[103px]">
                                        <div className="px-5 py-2">
                                            <span className="text-neutral font-bold text-xs uppercase">
                                                Watch a Demo - 1 minute
                                            </span>
                                        </div>
                                    </div>
                                    <span className="bg-warning rounded-full shadow-xl p-10 opacity-40 inline absolute w-14 h-14"></span>
                                    <span className="bg-warning rounded-full shadow-xl absolute p-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-7 h-7"
                                            width="44"
                                            height="44"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="#000000"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                stroke="none"
                                                d="M0 0h24v24H0z"
                                                fill="none"
                                            ></path>
                                            <path
                                                d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
                                                stroke-width="0"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </a>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Video;
