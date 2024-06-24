import { hiImg, rocketImg } from "../../../assets/assets";

const GetStarted = () => {
    return (
        <section>
            <div class="py-12">
                <h2 class="text-4xl font-bold text-neutral-700 lg:text-5xl text-center pb-10">
                    Get started now
                </h2>
                <div class="mx-auto max-w-5xl bg-base-200/50 rounded-3xl px-6 py-8 md:px-12 md:py-12">
                    <div class="flex flex-col md:flex-row">
                        <div class="flex w-full flex-col space-y-3 md:space-y-0 justify-between items-center">
                            <div class="mb-8">
                                <div class="mx-auto">
                                    <p class="text-3xl font-bold tracking-tight text-center text-neutral-700 sm:text-4xl">
                                        Sign for free
                                        <br />
                                        <span class="text-warning tracking-wider">
                                            in the Cloud
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div class="my-auto flex">
                                <a
                                    class="btn btn-base btn-outline btn-lg w-72"
                                    data-role="app-link"
                                    data-event="Click Sign Up"
                                    data-event-props='{"location":"Bottom of the landing page"}'
                                    data-event-initialized="true"
                                >
                                    <img
                                        src={rocketImg}
                                        className="w-[30px] h-[30px]"
                                    />
                                    Get Started
                                </a>
                            </div>
                        </div>
                        <div class="divider divider-vertical md:divider-horizontal my-8 md:my-0">
                            OR
                        </div>
                        <div class="flex w-full flex-col space-y-3 md:space-y-0 justify-between items-center">
                            <div class="mb-8">
                                <div class="mx-auto">
                                    <p class="text-3xl font-bold tracking-tight text-center text-neutral-700 sm:text-4xl">
                                        Contact us to
                                        <br />
                                        <span class="block md:inline text-warning tracking-wider">
                                            learn more
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div class="my-auto flex">
                                <a
                                    class="btn btn-base btn-outline btn-lg w-72"
                                    data-role="app-link"
                                    data-event="Click Contact Us"
                                    data-event-props='{"location":"Bottom of the landing page"}'
                                    data-event-initialized="true"
                                >
                                    <img
                                        src={hiImg}
                                        className="h-[30px] w-[30px]"
                                    />
                                    Contact Us
                                </a>{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetStarted;
