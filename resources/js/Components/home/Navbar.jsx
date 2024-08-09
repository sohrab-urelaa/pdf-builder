import { useState } from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";
import ApplicationLogo from "../ApplicationLogo";
import { FaUsers } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

const Navbar = ({ onSaveTemplate, template }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const handleSave = () => {
        onSaveTemplate(title);
    };
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-secondary-content">
                    <ApplicationLogo headerTitle={template?.title} />
                </a>
            </div>
            <div className="flex items-center gap-3">
                <a target="_blank" href={`/submit-templates/${template?.id}`}>
                    <button className="btn btn-ghost px-5 text-[20px]">
                        <FaUsers size={22} />
                        SIGN YOURSELF
                    </button>
                </a>
                <button className="btn btn-outline px-5 text-[20px]">
                    <FaUsers size={22} />
                    SEND
                </button>
                <button
                    onClick={handleSave}
                    className="btn btn-neutral px-5 text-[20px]"
                >
                    SAVE
                    <FaRegSave size={22} />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
