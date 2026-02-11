import ManageVenueItem from "../components/Venues/ManageVenueItem";
import ManageVenueList from "../components/Venues/ManageVenueList";
import VenueAdd from "../components/Venues/VenueAdd";

const ManageVenuesPage = () => {
  return (
    <section>
      <section className="max-w-3xl mx-auto mt-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Manage Venues</h1>
        <p className="text-lg">Here you can manage venues</p>
        <br />
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
          <VenueAdd />
          <ManageVenueItem />
        </section>
      </section>

      <section>
        <ManageVenueList />
      </section>
    </section>
  );
};

export default ManageVenuesPage;
