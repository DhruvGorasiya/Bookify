import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState<{
    title: string;
    address: string;
    description: string;
    photos: string[];
  } | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              Close photos
            </button>
          </div>
          {place?.photos.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img
                  className="w-full h-full"
                  src={"http://localhost:4000/uploads/" + photo}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-1 my-3 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div className="h-full">
            {" "}
            {place.photos?.[0] && (
              <div>
                <img
                  className="w-full h-full aspect-square object-cover"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
              />
            )}

            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-0 right-0 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
        >
          Show more photos
        </button>
      </div>

    

    </div>
  );
}
