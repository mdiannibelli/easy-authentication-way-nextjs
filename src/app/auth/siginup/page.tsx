
import SignupForm from "@/components/auth/SignupForm";
import { verifySession } from "@/lib/sessions";
import { redirect } from "next/navigation";
export default async function page() {
    const session = await verifySession();
    if (session) redirect("/dashboard");
    return (
        <main className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center">

            <div className="w-full max-w-[320px] mx-auto">
                <SignupForm />
            </div>
        </main>
    )
}
