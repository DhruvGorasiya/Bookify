import { useAuth } from "../context/AuthContext";

export default function HomeIndexPage() {

    const {user} = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}