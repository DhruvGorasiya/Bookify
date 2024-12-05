import { Description } from "@headlessui/react";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState<{
        extraInfo: ReactNode;
        price: ReactNode;
        maxGuests: ReactNode;
        checkOut: ReactNode;
        checkIn: ReactNode;
        title: string;
        address: string;
        description: string;
        photos: string[];
    } | null>(null);
    
    const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    useEffect(() => {
        if (!place?.address) return;

        const fetchNearbyPlaces = async () => {
            try {
                const geocodeResponse = await axios.get(
                    `http://localhost:4000/api/geocode`,
                    {
                        params: {
                            address: place.address,
                            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                        },
                    }
                );

                const location = geocodeResponse.data.results[0]?.geometry?.location;

                if (location) {
                    const placesResponse = await axios.get(
                        `http://localhost:4000/api/nearbySearch`,
                        {
                            params: {
                                location: `${location.lat},${location.lng}`,
                                radius: 1500, // Search within 1.5km
                                type: "restaurant", // Change this to 'tourist_attraction', 'cafe', etc., as needed
                                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                            },
                        }
                    );
                    setNearbyPlaces(placesResponse.data.results);
                }
            } catch (error) {
                console.error("Error fetching nearby places:", error);
            }
        };

        fetchNearbyPlaces();
    }, [place?.address]);

    if (!place) return "";

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl"> Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}<br />
                    Check-out: {place.checkOut}<br />
                    Max number of guests: {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl"> Extra info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="font-semibold text-2xl">Nearby Places</h2>
                <ul className="mt-4">
                    {nearbyPlaces.map((nearbyPlace) => (
                        <li key={nearbyPlace.place_id} className="mb-2">
                            <strong>{nearbyPlace.name}</strong> - {nearbyPlace.vicinity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
