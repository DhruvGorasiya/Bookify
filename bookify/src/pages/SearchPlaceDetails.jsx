import React from 'react';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const SearchPlaceDetails = ({ place }) => {
    if (!place) {
        return <div>No place selected.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{place.name}</h1>
            <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-xl mr-2" />
                <p>{place.formatted_address}</p>
            </div>
            {place.rating && (
                <div className="mb-4">
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500 text-lg mr-2" />
                        <p className="text-lg">Rating: {place.rating}</p>
                    </div>
                </div>
            )}
            {place.types && (
                <div className="mb-4">
                    <p>Types: {place.types.join(', ')}</p>
                </div>
            )}
            {place.formatted_phone_number && (
                <div className="mb-4">
                    <p>Phone: {place.formatted_phone_number}</p>
                </div>
            )}
            {place.website && (
                <a href={place.website} target="_blank" rel="noopener noreferrer">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Visit Website
                    </button>
                </a>
            )}
        </div>
    );
};

export default SearchPlaceDetails;