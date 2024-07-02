const DashboardState = ({ data }) => {
    return (
        <div className="mt-4 flex  flex-col gap-4">
            <div className="stats shadow gap-8">
                <div className="stat h-[180px]">
                    <div className="stat-figure text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">Total Company</div>
                    <div className="stat-value text-primary">
                        {data.totalCompany}
                    </div>
                    <div className="stat-desc">Number of company</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">Total Template</div>
                    <div className="stat-value text-secondary">
                        {data?.totalTemplate}
                    </div>
                    <div className="stat-desc">
                        Total pdf template created by the admin and users
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">Us</div>
                        </div>
                    </div>
                    <div className="stat-value">{data?.totalSubscription}</div>
                    <div className="stat-title">Total Subscription</div>
                    <div className="stat-desc text-secondary">
                        Total active subscritions in the system
                    </div>
                </div>
            </div>
            <div className="stats shadow">
                <div className="stat h-[180px]">
                    <div className="stat-figure text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">
                        {data.totalAdmin + data.totalUser}
                    </div>
                    <div className="stat-desc">All registered user</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">Admin</div>
                    <div className="stat-value text-secondary">
                        {data?.totalAdmin}
                    </div>
                    <div className="stat-desc">Total admin</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">Us</div>
                        </div>
                    </div>
                    <div className="stat-value">{data?.totalUser}</div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-desc text-secondary">
                        Users on the system
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardState;
