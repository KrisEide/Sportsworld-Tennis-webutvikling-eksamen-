import { type IVenue } from "../../interfaces/IVenue";

interface VenueItemProps {
  venue: IVenue;
  onDelete?: () => void; //optional callback fra parent
}

const VenueItem = ({ venue, onDelete }: /*{ venue: IVenue })*/ VenueItemProps) => {
  return (
    <article className="card mt-8 border text-left mb-20">
      <img
        className="w-full rounded-lg mb-2 h-48 object-cover"
        src={`http://localhost:5285/images/${venue.image}`}
        alt={`Bilde av ${venue.name}`}
      />
      <h3 className="text-lg font-bold">{venue.name}</h3>
      <p className="text-m text-white-700">Id: {venue.id}</p>
      <p className="text-m text-white-700">Capacity: {venue.capacity}</p>

      {onDelete && (
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 mt-2 cursor-pointer"
        >
          {" "}
          Delete
        </button>
      )}
    </article>
  );
};

export default VenueItem;
