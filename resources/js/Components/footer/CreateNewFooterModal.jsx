import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { Select } from "../Select";
import { createFooter, getParentFooters } from "../../api/adminApi";
const initalData = {
    title: "",
    footer_id: "",
    sub_title: "",
    sub_link: "",
    isNewParent: true,
};
const CreateNewFooterModal = ({
    open,
    setOpen,
    edit = false,
    footerItem = {},
    parentFooter = null,
    onSuccess = () => {},
}) => {
    const [footers, setFooters] = useState([]);
    const [data, setData] = useState(initalData);
    const [errors, setErrors] = useState(initalData);
    const [processing, setProcessing] = useState(false);

    // useEffect(() => {
    //     if (edit && company) {
    //         setData({
    //             companyName: company?.companyName,
    //             description: company?.description,
    //             planId: company?.plan?.id,
    //         });
    //     }
    // }, [company]);

    useEffect(() => {
        if (parentFooter && parentFooter?.id) {
            setData((prev) => ({
                ...prev,
                footer_id: parentFooter.id,
                isNewParent: false,
            }));
        }
    }, [parentFooter]);

    useEffect(() => {
        const fetchFooters = async () => {
            const data = await getParentFooters();
            setFooters(data);
        };
        fetchFooters();
    }, []);

    const parseErrors = (errors) => {
        const newErrors = initalData;
        Object.keys(errors).forEach((key) => {
            if (key.includes("subNavs") && key.includes("link")) {
                newErrors.sub_link = errors[key][0];
            } else if (key.includes("subNavs") && key.includes("title")) {
                newErrors.sub_title = errors[key][0];
            } else {
                newErrors[key] = errors[key][0];
            }
        });
        setErrors(newErrors);
    };

    const submit = async (e) => {
        e.preventDefault();
        const bodyData = {
            subNavs: [
                {
                    link: data.sub_link,
                    title: data.sub_title,
                },
            ],
        };
        if (data.isNewParent) {
            bodyData.title = data.title;
            bodyData.footer_id = null;
        } else {
            bodyData.title = "Title Dummy";
            bodyData.footer_id = data.footer_id;
        }
        try {
            setProcessing(true);
            const res = await createFooter(bodyData);
            setProcessing(false);
            if (res?.errors) {
                return parseErrors(res?.errors);
            }
            setErrors(initalData);
            if (res?.data.success) {
                setOpen(false);
                setData(initalData);
                onSuccess();
            }
        } catch (err) {
            console.log("Catch", err);
        }
    };

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title={edit ? "Update Footer" : "New Footer Item"}
        >
            <form onSubmit={submit}>
                <div className="flex items-center justify-center">
                    <div role="tablist" className="tabs tabs-boxed">
                        <a
                            onClick={() =>
                                setData((prev) => ({
                                    ...prev,
                                    isNewParent: true,
                                }))
                            }
                            role="tab"
                            className={`tab ${
                                data.isNewParent ? " tab-active" : ""
                            }`}
                        >
                            New Parent
                        </a>
                        <a
                            onClick={() =>
                                setData((prev) => ({
                                    ...prev,
                                    isNewParent: false,
                                }))
                            }
                            role="tab"
                            className={`tab ${
                                !data.isNewParent ? " tab-active" : ""
                            }`}
                        >
                            Existing Parent
                        </a>
                    </div>
                </div>
                {data.isNewParent ? (
                    <div>
                        <InputLabel htmlFor="title" value="Parent Title" />

                        <TextInput
                            id="title"
                            name="title"
                            type="text"
                            value={data.title}
                            className="mt-1 block w-full"
                            autoComplete="title"
                            isFocused={true}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>
                ) : (
                    <div>
                        <InputLabel htmlFor="footer_id" value="Footer Parent" />

                        <Select
                            id="footer_id"
                            name="footer_id"
                            value={data.footer_id}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    footer_id: e.target.value,
                                }))
                            }
                        >
                            {footers?.map((footer) => (
                                <option key={footer.id} value={footer.id}>
                                    {footer.title}
                                </option>
                            ))}
                        </Select>

                        <InputError
                            message={errors.footer_id}
                            className="mt-2"
                        />
                    </div>
                )}

                <div className="mt-4">
                    <InputLabel htmlFor="sub_title" value="Sub Title" />
                    <TextInput
                        id="sub_title"
                        type="text"
                        name="sub_title"
                        value={data.sub_title}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                sub_title: e.target.value,
                            }))
                        }
                    />
                    <InputError message={errors.sub_title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="sub_link" value="Link" />
                    <TextInput
                        id="sub_link"
                        type="text"
                        name="sub_link"
                        value={data.sub_link}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                sub_link: e.target.value,
                            }))
                        }
                    />
                    <InputError message={errors.sub_link} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? "Update" : " Create Footer"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewFooterModal;
