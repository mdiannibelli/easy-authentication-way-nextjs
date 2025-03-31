import { LogoutBtn } from "@/components/LogoutBtn";
import { getUser } from "../_data/user";


export default async function page() {
    const userData = await getUser();
    return (
        <div>
            <h1>Welcome <b>{userData.name}</b> to dashboard!</h1>
            <LogoutBtn />
        </div>
    )
}
