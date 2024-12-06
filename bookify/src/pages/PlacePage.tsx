// import { Description } from "@headlessui/react";
// import axios from "axios";
// import { ReactNode, useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import BookingWidget from "../BookingWidget";
// import PlaceGallery from "../PlaceGallery";
// import AddressLink from "../AddressLink";
// import { UserContext } from "../UserContext";

// export default function PlacePage() {
//   const { id } = useParams();
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [place, setPlace] = useState<{
//     extraInfo: ReactNode;
//     price: ReactNode;
//     maxGuests: ReactNode;
//     checkOut: ReactNode;
//     checkIn: ReactNode;
//     title: string;
//     address: string;
//     description: string;
//     photos: string[];
//     owner: string;
//   } | null>(null);

//   const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);

//   useEffect(() => {
//     if (!id) {
//       return;
//     }
//     axios.get("/places/" + id).then((response) => {
//       setPlace(response.data);
//     });
//   }, [id]);

//   useEffect(() => {
//     if (!place?.address) return;

//     const fetchNearbyPlaces = async () => {
//       try {
//         const geocodeResponse = await axios.get(
//           `http://localhost:4000/api/geocode`,
//           {
//             params: {
//               address: place.address,
//               key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//             },
//           }
//         );

//         const location = geocodeResponse.data.results[0]?.geometry?.location;

//         if (location) {
//           const placesResponse = await axios.get(
//             `http://localhost:4000/api/nearbySearch`,
//             {
//               params: {
//                 location: `${location.lat},${location.lng}`,
//                 radius: 1500, // Search within 1.5km
//                 type: "restaurant", // Change this to 'tourist_attraction', 'cafe', etc., as needed
//                 key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//               },
//             }
//           );
//           setNearbyPlaces(placesResponse.data.results);
//         }
//       } catch (error) {
//         console.error("Error fetching nearby places:", error);
//       }
//     };

//     fetchNearbyPlaces();
//   }, [place?.address]);

//   const renderActionButtons = () => {
//     return (
//       <div className="flex gap-4">
//         {/* Show booking widget for non-owners */}
//         {(!user || user._id !== place?.owner) && (
//           <div className="flex-grow">
//             <BookingWidget place={place} />
//           </div>
//         )}

//         {/* Show delete button for owner or admin */}
//         {(user?.role === "admin" || user?._id === place?.owner) && (
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg"
//           >
//             Delete Place
//           </button>
//         )}
//       </div>
//     );
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete("/places/" + id);
//       // Redirect to home page or places list after deletion
//       navigate("/");
//     } catch (error) {
//       console.error("Error deleting place:", error);
//     }
//   };

//   if (!place) return "";

//   return (
//     <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
//       <h1 className="text-3xl">{place.title}</h1>
//       <AddressLink>{place.address}</AddressLink>
//       <PlaceGallery place={place} />

//       <div className="mt-8 mb-8 grid gap-8 grid-cols-[2fr_1fr]">
//         <div>
//           <div className="my-4">
//             <h2 className="font-semibold text-2xl"> Description</h2>
//             {place.description}
//           </div>
//           Check-in: {place.checkIn}
//           <br />
//           Check-out: {place.checkOut}
//           <br />
//           Max number of guests: {place.maxGuests}
//         </div>
//       </div>

//       <div className="bg-white -mx-8 px-8 py-8 border-t">
//         <div>
//           <h2 className="font-semibold text-2xl"> Extra info</h2>
//         </div>
//         <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
//           {place.extraInfo}
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="font-semibold text-2xl">Nearby Places</h2>
//         <ul className="mt-4">
//           {nearbyPlaces.map((nearbyPlace) => (
//             <li key={nearbyPlace.place_id} className="mb-2">
//               <strong>{nearbyPlace.name}</strong> - {nearbyPlace.vicinity}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>{renderActionButtons()}</div>
//     </div>
//   );
// }


import { Description } from "@headlessui/react";
import axios from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import { UserContext } from "../UserContext";

export default function PlacePage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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
    owner: string;
  } | null>(null);

  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
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
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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

  const renderActionButtons = () => {
    return (
      <div className="flex gap-4 mt-4">
        {/* Show booking widget for non-owners */}
        {(!user || user._id !== place?.owner) && (
          <div className="flex-grow">
            <BookingWidget place={place} />
          </div>
        )}

        {/* Show delete button for owner or admin */}
        {(user?.role === "admin" || user?._id === place?.owner) && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Place
          </button>
        )}
      </div>
    );
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/places/" + id);
      // Redirect to home page or places list after deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-50 px-8 pt-8 pb-12 rounded-lg shadow-lg">
      {/* Title and Address */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>

      {/* Gallery */}
      <PlaceGallery place={place} />

      {/* Main Details */}
      <div className="mt-8 mb-8 grid gap-8 grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-semibold text-2xl text-gray-800 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">{place.description}</p>
          <div className="mt-4 text-gray-700">
            <p>Check-in: <span className="font-medium">{place.checkIn}</span></p>
            <p>Check-out: <span className="font-medium">{place.checkOut}</span></p>
            <p>Max Guests: <span className="font-medium">{place.maxGuests}</span></p>
          </div>
        </div>

        {/* Booking Widget / Actions */}
        <div>
          {renderActionButtons()}
        </div>
      </div>

      {/* Extra Info */}
      <div className="bg-white px-6 py-6 rounded-lg shadow-sm">
        <h2 className="font-semibold text-2xl text-gray-800">Extra Info</h2>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">{place.extraInfo}</p>
      </div>

      {/* Nearby Places */}
      <div className="mt-8">
        <h2 className="font-semibold text-2xl text-gray-800">Nearby Places</h2>
        <ul className="mt-4 space-y-2">
          {nearbyPlaces.map((nearbyPlace) => (
            <li
              key={nearbyPlace.place_id}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <strong className="text-gray-800">{nearbyPlace.name}</strong>
                <p className="text-sm text-gray-600">{nearbyPlace.vicinity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
