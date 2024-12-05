export default function PlaceImg({ place, index = 0, className }: { place: any, index?: number, className?: string }) {
    if (!place.photos?.length) {
        return null; // Return null if there are no photos
    }

    // Default className if not provided
    className = className || 'object-cover';

    return (
        <img
            src={`http://localhost:4000/uploads/${place.photos[index]}`}
            alt={place.title || 'Place'}
            className={className}
        />
    );
}
