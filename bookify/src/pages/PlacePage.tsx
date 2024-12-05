// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import BookingWidget from "../BookingWidget";

// export default function PlacePage() {
//   const { id } = useParams();
//   const [place, setPlace] = useState<{
//     title: string;
//     address: string;
//     description: string;
//     checkIn: string;
//     checkOut: string;
//     maxGuests: number;
//     extraInfo: string;
//     price: number;
//     photos: string[];
//   } | null>(null);
//   const [showAllPhotos, setShowAllPhotos] = useState(false);
//   useEffect(() => {
//     if (!id) {
//       return;
//     }
//     axios.get("/places/" + id).then((response) => {
//       setPlace(response.data);
//     });
//   }, [id]);
//   if (!place) return "";

//   if (showAllPhotos) {
//     return (
//       <div className="absolute inset-0 bg-black text-white min-h-screen">
//         <div className="bg-black p-8 grid gap-4">
//           <div>
//             <h2 className="text-3xl mr-48 shadow-sm ">Photos of {place.title}</h2>
//             <button
//               onClick={() => setShowAllPhotos(false)}
//               className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
//             >
//               Close photos
//             </button>
//           </div>
//           {place?.photos.length > 0 &&
//             place.photos.map((photo) => (
//               <div>
//                 <img
//                   className="w-full h-full"
//                   src={"http://localhost:4000/uploads/" + photo}
//                 />
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
//       <h1 className="text-3xl">{place.title}</h1>
//       <a
//         className="flex gap-1 my-3 block font-semibold underline"
//         target="_blank"
//         href={"https://maps.google.com/?q=" + place.address}
//       >
//         {place.address}
//       </a>
//       <div className="relative">
//         <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
//           <div className="h-full">
//             {" "}
//             {place.photos?.[0] && (
//               <div>
//                 <img onClick={() => setShowAllPhotos(true)}
//                   className="w-full h-full aspect-square cursor-pointer object-cover"
//                   src={"http://localhost:4000/uploads/" + place.photos[0]}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="grid">
//             {place.photos?.[1] && (
//               <img onClick={() => setShowAllPhotos(true)}
//                 className="aspect-square cursor-pointer object-cover"
//                 src={"http://localhost:4000/uploads/" + place.photos[1]}
//               />
//             )}

//             <div className="overflow-hidden">
//               {place.photos?.[2] && (
//                 <img onClick={() => setShowAllPhotos(true)}
//                   className="aspect-squarecursor-pointer  object-cover relative top-2"
//                   src={"http://localhost:4000/uploads/" + place.photos[2]}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={() => setShowAllPhotos(true)}
//           className="absolute bottom-0 right-0 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
//         >
//           Show more photos
//         </button>
//       </div>

//       <div className="mt-8 mb-8  grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
//         <div>
//           <div className="my-4">
//             <h2 className="font font-semibold text-2xl">Desciption</h2>
//             {place.description}
//           </div>
//           Check-in time: {place.checkIn} <br />
//           Check-out time: {place.checkOut} <br />
//           Max number of Guests: {place.maxGuests}
//         </div>
//         <BookingWidget place={place} />
//       </div>
//       <div className="bg-white -mx-8 px-8 py-8 border-t">
//         <div>
//           <h2 className="font font-semibold text-2xl">Extra info</h2>
//         </div>
//         <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
//       </div>
//     </div>
//   );
// }


import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState<{
    title: string;
    address: string;
    description: string;
    checkIn: string;
    checkOut: string;
    maxGuests: number;
    extraInfo: string;
    price: number;
    photos: string[];
  } | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => setPlace(response.data));
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black text-white min-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="py-2 px-4 rounded-md bg-white text-black shadow-md"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {place.photos.map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:4000/uploads/${photo}`}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-50 px-6 py-8">
      <h1 className="text-4xl font-bold mb-4">{place.title}</h1>
      <a
        href={`https://maps.google.com/?q=${place.address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline flex items-center gap-2 mb-6"
      >
        📍 {place.address}
      </a>

      <div className="relative">
        <div className="grid grid-cols-[70%_30%] gap-4 rounded-lg overflow-hidden">
          {/* Left photo taking 70% of the screen */}
          {place.photos[0] && (
            <img
              src={`http://localhost:4000/uploads/${place.photos[0]}`}
              alt="Main Photo"
              className="w-full object-cover cursor-pointer rounded-md"
              style={{ aspectRatio: "1 / 1" }}
              onClick={() => setShowAllPhotos(true)}
            />
          )}

          {/* Two square photos stacked on the right, each taking 30% */}
          <div className="flex flex-col gap-4">
            {place.photos[1] && (
              <img
                src={`http://localhost:4000/uploads/${place.photos[1]}`}
                alt="Secondary Photo 1"
                className="w-full object-cover cursor-pointer rounded-md"
                style={{ aspectRatio: "1 / 1" }}
                onClick={() => setShowAllPhotos(true)}
              />
            )}
            {place.photos[2] && (
              <img
                src={`http://localhost:4000/uploads/${place.photos[2]}`}
                alt="Secondary Photo 2"
                className="w-full object-cover cursor-pointer rounded-md"
                style={{ aspectRatio: "1 / 1" }}
                onClick={() => setShowAllPhotos(true)}
              />
            )}
          </div>
        </div>
        {place.photos.length > 3 && (
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 py-2 px-4 bg-white rounded-md shadow-lg"
          >
            Show more photos
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mt-8">
        <div>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-6">{place.description}</p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <ul className="text-gray-700">
              <li>Check-in time: {place.checkIn}</li>
              <li>Check-out time: {place.checkOut}</li>
              <li>Max Guests: {place.maxGuests}</li>
            </ul>
          </section>
        </div>
        <BookingWidget place={place} />
      </div>

      <div className="bg-white rounded-md p-6 mt-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
        <p className="text-gray-600 leading-6">{place.extraInfo}</p>
      </div>
    </div>
  );
}
