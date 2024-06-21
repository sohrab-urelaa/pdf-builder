const Navbar = ({ onChangePdf, onSaveTemplate }) => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-secondary-content">
                    Agreement demo
                </a>
            </div>
            <div className="flex items-center gap-3">
                <label className="btn btn-primary self-center">
                    Add Document
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={onChangePdf}
                        className="hidden"
                    />
                </label>
                <button className="btn btn-primary btn-outline px-10">
                    Send
                </button>
                <button
                    onClick={onSaveTemplate}
                    className="btn btn-secondary  px-10"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default Navbar;
