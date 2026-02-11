


using Backend.Interfaces;


namespace Backend.Models
{
    public class Athlete : IAthlete
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Gender { get; set; } = "";
        public int Price { get; set; }
        public bool PurchaseStatus { get; set; }
        public string Image { get; set; } = "";
        
    }
}