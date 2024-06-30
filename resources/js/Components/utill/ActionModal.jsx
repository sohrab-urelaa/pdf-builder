import Modal from "../utill/Modal";

const ActionModal = ({
    open,
    setOpen,
    title,
    positiveButtonText = "Yes",
    negativeButtonText = "Cancel",
    onAction,
    onCancel,
    description = "",
}) => {
    return (
        <Modal open={open} setOpen={setOpen} title={""}>
            <h1 className="text-secondary-content text-xl font-extrabold">
                {title}
            </h1>
            <br />
            <p>{description}</p>
            <div className="flex items-center gap-3 justify-center">
                <button className="btn btn-ghost" onClick={onCancel}>
                    {negativeButtonText}
                </button>
                <button className="btn btn-outline" onClick={onAction}>
                    {positiveButtonText}
                </button>
            </div>
        </Modal>
    );
};

export default ActionModal;
