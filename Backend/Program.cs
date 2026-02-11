
using Backend.Context;
using Microsoft.EntityFrameworkCore;




var builder = WebApplication.CreateBuilder(args);


//(dotnet ef migrations add InitialCreate og dotnet ef database update)
builder.Services.AddDbContext<SWContext>(
    options => options.UseSqlite("Data Source=Database/SW.db")
);



//2)
//CORS 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
    );
});

//3) Controllers
builder.Services.AddControllers();

//4) OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles(); //launcher stylet web-api ved oppstart
app.UseStaticFiles(); //web-api

//For bilder med wwwroot
app.UseStaticFiles();

//Aktivere CORS
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); //openAPI
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
