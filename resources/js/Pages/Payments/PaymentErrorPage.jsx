import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
export default function PaymentErrorPage({ auth, message }) {
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Payment Success" />
            <div className="mt-5 flex items-center justify-center">
                <div className="bg-base-100 p-16 rounded-lg">
                    <h3 className="text-error text-3xl ">
                        {message ? message : subscription?.payment_message}
                    </h3>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
