const HomePage = () => {
  return (
 <div 
  className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center relative overflow-hidden"
  style={{ backgroundImage: "url('/t.jpg.webp')" }}
>
  
 
  <img src="/tennisball.png" alt="tball" className="tennis-ball" />

  <section
    className="
      home-Box
      bg-black
      border border-[#68b8ce]
      rounded-xl 
      p-6 
      shadow-lg 
      text-white 
      w-130
      text-center
    "
  >
    <div className="relative w-full h-[150px]">
      <h3 className="text-2xl font-bold">Welcome to sportsworld!</h3>
      <p className="text-lg py-5">
        Please navigate to one of our pages to perform your task
      </p>
      <h2 className="text-lg font-bold text-[#68b8ce]">
        Manage your dream sport event <br/>
      </h2>
      <p className="text-l py-3"> Browse, create or edit your athletes and venues</p>
    </div>
  </section>
</div>

  );
};

export default HomePage;
