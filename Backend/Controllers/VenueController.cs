
using Microsoft.AspNetCore.Mvc;
using Backend.Context;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
// alle apikontrollere skal arvve fra controllerbase


public class VenueController : ControllerBase
{
	private readonly SWContext _context;
	private readonly IWebHostEnvironment _webHostEnvironment;
	public VenueController(SWContext context, IWebHostEnvironment webHostEnvironment)
	{
		_context = context;
		_webHostEnvironment = webHostEnvironment;
	}

 	// GET
 	[HttpGet] 
 	public async Task<ActionResult<List<Venue>>> Get()
 	{
 		try
 		{
 			List<Venue> venues = await _context.Venues.ToListAsync();
 			return Ok(venues);
 		}
 		catch
 		{
 			// Noe gikk galt på server
 			return StatusCode(500); 
 		}
 	}

	// GET - id 
	[HttpGet("{id}")]
	public async Task<ActionResult<Venue>> Get(int id)
	{
		Venue? venue = await _context.Venues.FindAsync(id);
		if (venue != null)
		{
			return Ok(venue);
		}
		else
		{
			return NotFound("Venue with this id is not found!");
		}
	}

 	// POST
 	[HttpPost]
 	public async Task<IActionResult> Post(Venue venue)
 	{
 		try
 		{
 			_context.Venues.Add(venue);
 			await _context.SaveChangesAsync();
 			return Created("", venue);
 		}
 		catch
 		{
 			return StatusCode(500, "Server side error when getting venues");
 		} 
 	}

	// PUT = redigere informasjon
	[HttpPut]
	public async Task<IActionResult> Put (Venue editedVenue)
	{
		try
		{
			_context.Venues.Entry(editedVenue).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			// NoContent betyr "OK, men ingen data å returnere"
			return NoContent();
		}
		catch
		{
			return StatusCode(500);
		}
	}

	// DELETE - fra slides 
	[HttpDelete("{id}")]

	public async Task<IActionResult> Delete(int id)
	{
		Venue? venue = await _context.Venues.FindAsync(id);
		if (venue != null)
		{
			_context.Venues.Remove(venue);
			await _context.SaveChangesAsync();
			return NoContent(); //NoContent er en 204-meldingsom betyr alt OK trenger ikke returnere noe 
		}
		else
		{
			return NotFound();
		}
	}

	// Endpoint for image upload 
	[HttpPost("imgupload")]
 	// iformfile er metoden for å hente bildet/pdf/filer
		public async Task<IActionResult> PostImage(IFormFile file)
	{
		try
		{
			/* filstien der bildet skal lagres, deretter kommer en 
			metode som har med filstrøm å gjøre, er et objekt som tar tak i bildedata og bokstavelgi 
			talkt lagrer det i bildemappen*/
			//filsti: 
			string webRootPath = _webHostEnvironment.WebRootPath;
			// kommer ril å være en kombinasjon av webroottbpathen med hvor det ligger og navnet på bildet : 
			
			Console.WriteLine("WebRootPath: " + _webHostEnvironment.WebRootPath);


			string absolutePath = Path.Combine(
				webRootPath,
				"images",
				file.FileName
			);
			Console.WriteLine("Saving to: " + absolutePath);

			using (var fileStream = new FileStream(absolutePath, FileMode.Create))
			{
				//når man lager en filstrøm lager ma n en åpen forbindelse, den må åpnes og lukkes. sørger for at man åpner og lukker filstrømmen til riktig tid 
				await file.CopyToAsync(fileStream);
			}
			return Created();
		}
		catch
		{
			// serverside feil
			return StatusCode(500, "Image upload failed in server!"); 
		}
	}
}