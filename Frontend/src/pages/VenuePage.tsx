
import VenueList from "../components/Venues/VenueList";
import VenueSearch from "../components/Venues/VenueSearch";
import { VenueProvider } from "../contexts/VenueContext";

const VenuePage = () => {
  return (
    <VenueProvider>
      <section>
        <header className="max-w-3xl mx-auto mt-12 text-center p-8">
          <h1 className="text-xl font-bold">Our registered venues</h1>
        </header>

          <VenueSearch />
          <VenueList />

      </section>
    </VenueProvider>
  );
};

export default VenuePage;
