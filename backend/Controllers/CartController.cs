using e_commercedsw.backend.Data;
using e_commercedsw.backend.Database;
using e_commercedsw.backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/cart")]
public class CartController : ControllerBase
{
    private readonly AppDbContext _db;
    public CartController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<CartDto>> Get()
    {
        var cart = CartStore.Cart;

        if (cart.Count == 0)
            return Ok(new CartDto(new List<CartItemDto>()));

        var productIds = cart.Keys.ToList();

        var products = await _db.Products
            .AsNoTracking()
            .Where(p => productIds.Contains(p.Id))
            .ToListAsync();

        // (opcjonalnie) usuń z koszyka produkty, których już nie ma w DB
        foreach (var missingId in productIds.Except(products.Select(p => p.Id)).ToList())
            cart.Remove(missingId);

        var items = products.Select(p =>
        {
            cart.TryGetValue(p.Id, out var qty);

            return new CartItemDto(
                Id: p.Id,
                ProductId: p.Id,
                Title: p.Title,
                Price: p.Price,
                SelectedQuantity: Math.Min(Math.Max(1, qty), p.StockQuantity),
                StockQuantity: p.StockQuantity,
                ImageUrl: p.ImageUrl
            );
        }).ToList();

        return Ok(new CartDto(items));
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddItem([FromBody] AddCartItemDto dto)
    {
        var cart = CartStore.Cart;

        var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == dto.ProductId);
        if (product is null) return NotFound(new { message = "Product not found" });

        var qty = Math.Max(1, dto.Quantity);

        cart.TryGetValue(dto.ProductId, out var existing);
        cart[dto.ProductId] = Math.Min(existing + qty, product.StockQuantity);

        return Ok();
    }

    [HttpPut("items/{productId:int}")]
    public async Task<IActionResult> UpdateItem(int productId, [FromBody] UpdateCartItemDto dto)
    {
        var cart = CartStore.Cart;

        var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == productId);
        if (product is null) return NotFound(new { message = "Product not found" });

        var qty = Math.Max(1, dto.Quantity);
        cart[productId] = Math.Min(qty, product.StockQuantity);

        return Ok();
    }

    [HttpDelete("items/{productId:int}")]
    public IActionResult RemoveItem(int productId)
    {
        CartStore.Cart.Remove(productId);
        return Ok();
    }
}