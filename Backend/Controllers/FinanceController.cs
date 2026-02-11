using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Context;


namespace Backend.Controllers; 

[ApiController]
[Route("api/[controller]")]

public class FinanceController : ControllerBase
{
    private readonly SWContext _context;

    public FinanceController(SWContext context)
    {
        _context = context;
    }

   
//get for finans
 [HttpGet]
public async Task<ActionResult<Finance>> Get()
{
    var finance = await _context.Finances.FirstOrDefaultAsync();
    if (finance == null) return NotFound();

    return Ok(finance);
}

// Post-tar lån
[HttpPost("loan/{amount}")]
public async Task<IActionResult> TakeLoan(int amount)
{
    if (amount <= 0)
        return NoContent(); //204

    var finance = await _context.Finances.FirstOrDefaultAsync();
    if (finance == null)
        return NotFound("Finance record not found"); //404 ikke funnet

    finance.MoneyLeft += amount;

    await _context.SaveChangesAsync();

    return Ok(finance);
}



//oppdater values
[HttpPut("purchase/{athleteId}")]
public async Task<IActionResult> PurchaseAthlete(int athleteId)
{
    var athlete = await _context.Athletes.FindAsync(athleteId);
    if (athlete == null) return NotFound();
    if (athlete.PurchaseStatus) return NoContent(); //allerede kjøpt

    var finance = await _context.Finances.FirstOrDefaultAsync();
    if (finance == null) return NotFound();

     if (finance.MoneyLeft < athlete.Price)
    {
        return NotFound("Not enough money");
    }

    finance.MoneyLeft -= athlete.Price;
    finance.MoneySpent += athlete.Price;
    finance.NumberOfPurchases++;

    athlete.PurchaseStatus = true;

    await _context.SaveChangesAsync();

    return Ok(finance);
}


}
