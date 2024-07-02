import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
export default function PaymentSuccessPage({ subscription }) {
    return (
        <AuthenticatedLayout user={subscription.user}>
            <Head title="Payment Success" />
            <div className="mt-5 flex items-center justify-center">
                <div className="bg-base-300">
                    <h3 className="text-success text-3xl ">
                        {subscription?.payment_message}
                    </h3>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
