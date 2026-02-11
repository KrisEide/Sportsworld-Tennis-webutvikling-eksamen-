import AthleteAdd from "../components/Athletes/AthleteAdd";

const RegistrerAthletesPage = () => {
  return (
    <section className="max-w-3xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Register Athletes</h1>
      <p className="text-lg mb-9">Here you can register new athletes</p>
      <AthleteAdd />
    </section>
  );
};

export default RegistrerAthletesPage;
