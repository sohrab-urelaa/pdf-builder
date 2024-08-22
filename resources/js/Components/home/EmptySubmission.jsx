import { useTranslation } from "react-i18next";

const EmptySubmission = ({ template, onSendInvitations }) => {
    const { t } = useTranslation();
    return (
        <div className="card-body text-center py-16 bg-base-200 rounded-md">
            <div className="max-w-lg mx-auto">
                <p className="text-3xl font-bold text-base-content mb-4">
                    {t("no_submissions")}
                </p>
                <p>{t("no_submission_message")}</p>
                <div className="space-y-2 flex flex-col">
                    <button
                        onClick={onSendInvitations}
                        className="btn btn-neutral btn-lg rounded-md mt-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 stroke-2"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>

                        <span className="mr-1"> {t("send_to_receipents")}</span>
                    </button>{" "}
                    <a
                        className="btn btn-neutral btn-lg rounded-md mt-4"
                        target="_blank"
                        rel="noopener"
                        href={`/submit-templates/${template?.id}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
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
                            <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"></path>
                            <path d="M16 7h4"></path>
                            <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3"></path>
                        </svg>

                        <span className="mr-1">{t("sign_it_yourself")}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EmptySubmission;
