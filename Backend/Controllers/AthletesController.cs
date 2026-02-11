using Backend.Context;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AthletesController : ControllerBase
    {
        private readonly SWContext _context;

        public AthletesController(SWContext context)
        {
            _context = context;
        }


        // GET: api/athletes 

        [HttpGet]
        public async Task<ActionResult<List<Athlete>>> Get()
        {
            try
            {
                var athletes = await _context.Athletes.ToListAsync();
                return Ok(athletes);
            }
            catch
            {
                return StatusCode(500);
            }


        }

        //PUT - For å redigere Athletes
        [HttpPut]
        public async Task<IActionResult> Put(Athlete editedAthlete)
        {
            try
            {
                //Vi må finne riktig athlete.
                var athleteFromDb = await _context.Athletes.FindAsync(editedAthlete.Id);

                if (athleteFromDb == null)
                {
                    return NotFound(); //404 hvis id ikke finnes.
                }

                //Feltene som skal endres
                athleteFromDb.Name = editedAthlete.Name;
                athleteFromDb.Price = editedAthlete.Price;
                athleteFromDb.Gender = editedAthlete.Gender;
                athleteFromDb.Image = editedAthlete.Image;

                //Lagrer nye endringer
                await _context.SaveChangesAsync();

                return NoContent(); //204
            }
            catch
            {
                return StatusCode(500);
            }

        }






        //Finance register athlete
        [HttpPut("{id}/register")]
        public async Task<IActionResult> RegisterAthlete(int id)
        {
            var athlete = await _context.Athletes.FindAsync(id);

            if (athlete == null)
                return NotFound();

            athlete.PurchaseStatus = true;

            await _context.SaveChangesAsync();

            return Ok(athlete);
        }




        [HttpDelete("{id}")]

        public async Task<ActionResult> Delete(int id)
        {
            try

            {
                Athlete? athlete = await _context.Athletes.FindAsync(id);

                if (athlete != null)
                {
                    _context.Athletes.Remove(athlete);
                    await _context.SaveChangesAsync();

                    return NoContent();

                }
                else
                {
                    return NotFound();
                }
            }

            catch
            {
                return StatusCode(500);
            }


        }

        [HttpPost]
        public async Task<IActionResult> Post(Athlete athlete)
        {
            try

            {
                // Athletes skal ha PurchaseStatus satt til FALSE når de er laget.
                athlete.PurchaseStatus = false;

                _context.Athletes.Add(athlete);
                await _context.SaveChangesAsync();

                return Created("", athlete);

            }
            catch
            {
                return StatusCode(500);
            }
        }




    }
    }






