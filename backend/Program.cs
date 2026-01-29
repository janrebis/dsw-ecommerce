using e_commercedsw.backend.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var cs = builder.Configuration.GetConnectionString("Default");
if (string.IsNullOrWhiteSpace(cs))
    throw new InvalidOperationException("Brak ConnectionStrings:Default");

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(cs));

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.Migrate();

    if (!db.Products.Any())
    {
        db.Products.AddRange(
            new ProductEntity
            {
                Title = "PlayStation 5 Pro",
                Price = 1999.99m,
                StockQuantity = 50,
                ImageUrl = ""
            },
            new ProductEntity
            {
                Title = "DualSense Controller",
                Price = 299.99m,
                StockQuantity = 100,
                ImageUrl = ""
            },
            new ProductEntity
            {
                Title = "Headset",
                Price = 499.99m,
                StockQuantity = 30,
                ImageUrl = ""
            }
        );
        db.SaveChanges();
    }
}


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("frontend");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();