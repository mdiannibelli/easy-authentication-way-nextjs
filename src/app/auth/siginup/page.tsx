
import SignupForm from "@/components/auth/SignupForm";
export default function page() {
    return (
        <main className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center">

            <div className="w-full max-w-[320px] mx-auto">
                <SignupForm />
            </div>
        </main>
    )
}
