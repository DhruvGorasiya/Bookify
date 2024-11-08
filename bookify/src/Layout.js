import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex flex-col">
            <Header />
            <main className="pt-24 p-4">
                <Outlet />
            </main>
        </div>
    );
}