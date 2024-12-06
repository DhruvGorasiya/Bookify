import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

interface Place {
    extraInfo: ReactNode;
    price: ReactNode;
    maxGuests: ReactNode;
    checkOut: ReactNode;
    checkIn: ReactNode;
    title: string;
    address: string;
    description: string;
    photos: string[];
}

export default function PlacePage() {
    const { id } = useParams();

    const [place, setPlace] = useState<Place | null>(null);
    const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
    const [highlightedPlaces, setHighlightedPlaces] = useState<Set<string>>(new Set());
    const [bookmarkedPlaces, setBookmarkedPlaces] = useState<Set<string>>(new Set());
    const [showOnlyHighlighted, setShowOnlyHighlighted] = useState(false);

    // Fetch place details
    useEffect(() => {
        if (!id) return;

        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    // Fetch nearby places using Google Maps API
    useEffect(() => {
        if (!place?.address) return;

        const fetchNearbyPlaces = async () => {
            try {
                const geocodeResponse = await axios.get(`http://localhost:4000/api/geocode`, {
                    params: {
                        address: place.address,
                        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                    },
                });

                const location = geocodeResponse.data.results[0]?.geometry?.location;

                if (location) {
                    const placesResponse = await axios.get(
                        `http://localhost:4000/api/nearbySearch`,
                        {
                            params: {
                                location: `${location.lat},${location.lng}`,
                                radius: 1500,
                                type: "restaurant",
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

    // Fetch initial bookmarks from API and update highlighted places
    useEffect(() => {
        const fetchBookmarkedPlaces = async () => {
            try {
                const response = await axios.get(`/api/bookmarks`);
                const places = new Set<string>(response.data.map((place: { place_id: string }) => place.place_id));
                setBookmarkedPlaces(places);
                setHighlightedPlaces((prev) => {
                    const updated = new Set(prev);
                    places.forEach((placeId) => updated.add(placeId));
                    return updated;
                });
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarkedPlaces();
    }, []);

    // Toggle highlight and bookmark functionality
    const toggleHighlightAndBookmark = async (placeId: string) => {
        const newHighlightedPlaces = new Set(highlightedPlaces);
        if (newHighlightedPlaces.has(placeId)) {
            newHighlightedPlaces.delete(placeId);
        } else {
            newHighlightedPlaces.add(placeId);
        }
        setHighlightedPlaces(newHighlightedPlaces);

        const toggleHighlightAndBookmark = async (placeId: string) => {
            const newHighlightedPlaces = new Set(highlightedPlaces);
            if (newHighlightedPlaces.has(placeId)) {
                newHighlightedPlaces.delete(placeId);
            } else {
                newHighlightedPlaces.add(placeId);
            }
            setHighlightedPlaces(newHighlightedPlaces);

            try {
                if (newHighlightedPlaces.has(placeId)) {
                    // Add to bookmarks
                    await axios.post(`/api/bookmarks`, { placeId });
                    setBookmarkedPlaces((prev) => new Set(prev.add(placeId)));
                } else {
                    // Remove from bookmarks
                    await axios.delete(`/api/bookmarks/${placeId}`);
                    setBookmarkedPlaces((prev) => {
                        const updated = new Set(prev);
                        updated.delete(placeId);
                        return updated;
                    });
                }
            } catch (error) {
                console.error("Error toggling bookmark:", error);
            }
        };

    };

    // Load highlighted places from localStorage on mount (optional, if you still want to store this information locally)
    useEffect(() => {
        const savedHighlights = localStorage.getItem("highlightedPlaces");
        if (savedHighlights) {
            setHighlightedPlaces(new Set(JSON.parse(savedHighlights)));
        }
    }, []);

    // Save highlighted places to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("highlightedPlaces", JSON.stringify(Array.from(highlightedPlaces)));
    }, [highlightedPlaces]);

    if (!place) return null;

    const filteredPlaces = showOnlyHighlighted
        ? nearbyPlaces.filter((nearbyPlace) => highlightedPlaces.has(nearbyPlace.place_id))
        : nearbyPlaces;

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}
                    <br />
                    Check-out: {place.checkOut}
                    <br />
                    Max number of guests: {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-2xl">Nearby Places</h2>
                    <button
                        className={`px-4 py-2 rounded text-white ${showOnlyHighlighted ? "bg-blue-600" : "bg-gray-600"}`}
                        onClick={() => setShowOnlyHighlighted(!showOnlyHighlighted)}
                    >
                        {showOnlyHighlighted ? "Show All Places" : "Show Highlighted Only"}
                    </button>
                </div>
                <ul className="mt-4">
                    {filteredPlaces.map((nearbyPlace) => (
                        <li
                            key={nearbyPlace.place_id}
                            className={`mb-2 p-3 rounded cursor-pointer ${highlightedPlaces.has(nearbyPlace.place_id)
                                ? "bg-yellow-100 border-2 border-yellow-500"
                                : "bg-white"
                                }`}
                            onClick={() => toggleHighlightAndBookmark(nearbyPlace.place_id)}
                        >
                            <strong>{nearbyPlace.name}</strong> - {nearbyPlace.vicinity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
