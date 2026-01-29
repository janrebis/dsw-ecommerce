using e_commercedsw.backend.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace e_commercedsw.backend.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _db.Products.AsNoTracking().ToListAsync();
        return Ok(products.Select(p => new
        {
            id = p.Id,
            title = p.Title,
            price = p.Price,
            imageUrl = p.ImageUrl
        }));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var p = await _db.Products.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (p is null) return NotFound();

        return Ok(new
        {
            id = p.Id,
            title = p.Title,
            price = p.Price,
            imageUrl = p.ImageUrl,
            specifications = Array.Empty<object>()
        });
    }
}