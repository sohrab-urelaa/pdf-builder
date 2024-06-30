import { router, useForm } from "@inertiajs/react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";

const CreateNewPlansModal = ({ open, setOpen, edit = false, plan = {} }) => {
    const { data, setData, post, processing, errors, reset, put } = useForm({
        title: "",
        description: "",
        number_of_document: "",
        monthly_price: "",
        yearly_price: "",
        isDefault: false,
    });

    useEffect(() => {
        if (edit && plan) {
            setData({
                ...plan,
                isDefault: Boolean(plan.isDefault),
            });
        }
    }, [plan]);
    const submit = (e) => {
        e.preventDefault();
        if (edit) {
            router.put(`/admin/plans/${plan?.id}`, data, {
                onSuccess: (res) => {
                    if (res?.props?.plan?.id) {
                        setOpen(false);
                    }
                },
            });
        } else {
            post(route("plans.create"), {
                onSuccess: (res) => {
                    if (res.props.plan) {
                        setOpen(false);
                    }
                },
            });
        }
    };
    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title={edit ? "Update Plan" : "Create New Plan"}
        >
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        name="title"
                        type="text"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoComplete="title"
                        isFocused={true}
                        onChange={(e) => setData("title", e.target.value)}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        autoComplete="description"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="number_of_document"
                        value="Number of Template"
                    />

                    <TextInput
                        id="number_of_document"
                        type="number"
                        name="number_of_document"
                        value={data.number_of_document}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("number_of_document", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.number_of_document}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="yearly_price" value="Yearly Price" />

                    <TextInput
                        id="yearly_price"
                        type="number"
                        name="yearly_price"
                        value={data.yearly_price}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("yearly_price", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.yearly_price}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="monthly_price" value="Monthly Price" />

                    <TextInput
                        id="monthly_price"
                        type="number"
                        name="monthly_price"
                        value={data.monthly_price}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("monthly_price", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.monthly_price}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4 flex items-center">
                    <input
                        id="isDefaultPlan"
                        type="checkbox"
                        value={data.isDefault}
                        className="checkbox"
                        onChange={(e) => setData("isDefault", e.target.checked)}
                    />
                    <label className="ml-2" htmlFor="isDefaultPlan">
                        Default
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? "Update" : " Create Plan"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewPlansModal;
