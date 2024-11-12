import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomeIndexPage() {

    const {user} = useAuth();

    const {state} = useLocation();

    if (!state) {
        return <div>Loading...</div>;
    }
    console.log(user);
    return (
        <div>
            <p>{state?.email}</p>
            <p>{state?.password}</p>
            <p>{state?.role}</p>
        </div>
    );
}