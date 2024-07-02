import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    return (
        <div className="flex items-center justify-end">
            <div className="join">
                {links?.map((link) => (
                    <Link href={`${link.url ? link.url : "#"}`}>
                        <button
                            className={`join-item btn btn-md ${
                                link?.active ? " btn-secondary" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: link?.label }}
                        ></button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
