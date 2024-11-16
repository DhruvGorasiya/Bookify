import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function HomeIndexPage() {

    const {user} = useContext(UserContext);

    const {state} = useLocation();

    console.log(state);

    if (!user) {
        return <div>This is the home page please login to see your places</div>;
    }
    console.log(user);
    return (
        <div>
            <h1>You are looged in as {user.name}</h1>
        </div>
    );
}