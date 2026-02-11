// MODELS

using Backend.Interfaces;

namespace Backend.Models;

public class Venue : IVenue
{
    public int Id { get; set; }
    public string Name { get; set; } = String.Empty;
	public int Capacity { get; set; }
	public string Image { get; set; } = String.Empty;
}
