import { useState } from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";

const Navbar = ({ onChangePdf, onSaveTemplate }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const handleSave = () => {
        if (!title?.trim()) {
            setError("Please enter template title");
            return;
        }

        setError("");
        onSaveTemplate(title);
    };
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-secondary-content">
                    Agreement demo
                </a>
            </div>
            <div className="flex items-center gap-3">
                <div>
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput
                        id="title"
                        name="title"
                        value={title}
                        autoComplete="title"
                        isFocused={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputError message={error} className="mt-2" />
                </div>
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
                    onClick={handleSave}
                    className="btn btn-secondary  px-10"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default Navbar;
