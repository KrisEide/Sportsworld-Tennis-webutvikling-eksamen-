
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ImageUploadAthleteController(IWebHostEnvironment webHostEnvironment) : ControllerBase {
    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        try


        {   //Sjekker om filen er null.
            if (file == null || file.Length == 0)
            {
                return StatusCode(400, "No file uploaded");
            }

            string webRootPath = webHostEnvironment.WebRootPath;
            string absolutePath = Path.Combine(
                webRootPath,
                "images",
                file.FileName
            );

            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Created();
        }
        catch
        {
            return StatusCode(500);
        }
     }
}