import { Navigate, useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut, updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import toast from "react-hot-toast";
import PlacePage from "./PlacePage";


export default function AccountPage() {
    const {ready, user} = useAuth();
    let {subpage} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function handleLogout() {
        try {
            await signOut(auth);
            navigate('/login'); // Navigate to login page after logout
            toast.success("Logged out successfully");
        } catch (e: any) {
            toast.error(e.message);
        }
    }
    
    async function updateProfileInfo() {
        try {
            // Update user name
            if (user) {
                await updateProfile(user, { displayName: name });
                
                // Update user email
                if (email !== user.email) {
                    await updateEmail(user, email);
                }
                toast.success("Profile updated successfully");
            }
        } catch (e: any) {
            toast.error(e.message);
        }
    }
    
    function linkClasses(type:string | null = null){
       let classes = 'py-2 px-6 inline-flex items-center';
       if (type === subpage) {
        classes += ' bg-black rounded-full';
       }

       return classes;
    }

    if(!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            {/* <p className="w-full flex mt-6 justify-center">Account page for {user?.displayName}</p> */}
        
        <nav className="w-full text-white flex mt-8 justify-center mt-8 gap-4 mb-8">
            <Link className={linkClasses('profile')} to={'/account '}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-1 size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg> 
            Profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-1 size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
            Bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-1 size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>
            Accommodations</Link>
        </nav>
        {subpage === 'profile' && (
        <div className="flex justify-center items-center" >
            <div className="justify-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit your Profile</h2>
                <label>
                    Name: <br/>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        className="bg-gray-200 text-black rounded-full max-w-sm py-2 px-4 w-full mt-1"
                    />
                    </label><br/><br/>
                    
                    <label>
                        Email-ID: <br/>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="bg-gray-200 text-black rounded-full max-w-sm py-2 px-4 w-full mt-1"
                        />
                    </label><br/><br/>

                    <button onClick={updateProfileInfo} className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full w-full font-semibold transition duration-200 transform hover:scale-105">Update</button> <br/>
                    <button onClick={handleLogout} className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 mt-5 px-4 rounded-full w-full font-semibold transition duration-200 transform hover:scale-105">Logout</button>
            </div>
        </div>
        )}

        {subpage === 'places' && (
            <PlacePage />
        )}
        </div>
        
    )
}