using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Context;

public class SWContext(DbContextOptions<SWContext> options) : DbContext(options)
{
    public DbSet<Finance> Finances { get; set; }
    public DbSet<Athlete> Athletes {get; set;}
    public DbSet<Venue> Venues { get; set; }
}