import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserContext } from "../UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function HomeIndexPage() {
    const [places, setPlaces] = useState<{ _id:string, title: string, address: string, price: number, description: string, photos: string[] }[]>([]);
    useEffect(() => {
       axios.get('/places').then(response => {
        setPlaces(response.data);
       }) 
    }, [])

    const {user} = useContext(UserContext);

    const {state} = useLocation();

    console.log(state);

    // if (!user) {
    //     return <div>This is the home page please login to see your places</div>;
    // }
    // console.log(user);
    // return (
    //     <div>
    //         <h1>You are logged in as {user.name}</h1>
    //     </div>
    // );
    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/'+place._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] && (
                    <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt=""/>
                    )}
                    </div>
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm text-black-500">{place.title}</h3>
                    <div className="mt-1">
                        <span className="font-bold">${place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
}