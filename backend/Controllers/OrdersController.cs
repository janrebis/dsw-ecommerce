using System.Security.Claims;
using e_commercedsw.backend.Data;
using e_commercedsw.backend.Database;
using e_commercedsw.backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace e_commercedsw.backend.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _db;
    public OrdersController(AppDbContext db) => _db = db;

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrderDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized(new { message = "Brak użytkownika w tokenie" });

        var cart = CartStore.Cart;
        if (cart.Count == 0)
            return BadRequest(new { message = "Koszyk jest pusty" });

        var ids = cart.Keys.ToList();
        var products = await _db.Products.Where(p => ids.Contains(p.Id)).ToListAsync();

        if (products.Count != ids.Count)
            return BadRequest(new { message = "Niektóre produkty nie istnieją" });

        foreach (var kv in cart)
        {
            var p = products.First(x => x.Id == kv.Key);
            if (kv.Value > p.StockQuantity)
                return BadRequest(new { message = $"Brak wystarczającej ilości: {p.Title}" });
        }

        var order = new OrderEntity
        {
            UserId = userId,
            CreatedAtUtc = DateTime.UtcNow,
            DeliveryMethod = dto.DeliveryMethod,
            Address = new OrderAddress
            {
                FullName = dto.Address.FullName,
                Address = dto.Address.Address,
                PostalCode = dto.Address.PostalCode,
                City = dto.Address.City,
                Phone = dto.Address.Phone,
                Email = dto.Address.Email
            }
        };

        foreach (var kv in cart)
        {
            var p = products.First(x => x.Id == kv.Key);

            order.Items.Add(new OrderItemEntity
            {
                ProductId = p.Id,
                Title = p.Title,
                Price = p.Price,
                Quantity = kv.Value,
                LineTotal = p.Price * kv.Value
            });

            p.StockQuantity -= kv.Value;
        }

        order.Total = order.Items.Sum(i => i.LineTotal);

        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        cart.Clear();

        return Ok(new { id = order.Id });
    }

    [Authorize]
    [HttpGet("mine")]
    public async Task<IActionResult> Mine()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var orders = await _db.Orders
            .Include(o => o.Items)
            .AsNoTracking()
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAtUtc)
            .ToListAsync();

        return Ok(orders.Select(o => new
        {
            id = o.Id,
            createdAtUtc = o.CreatedAtUtc,
            deliveryMethod = o.DeliveryMethod,
            total = o.Total,
            address = new
            {
                fullName = o.Address.FullName,
                address = o.Address.Address,
                postalCode = o.Address.PostalCode,
                city = o.Address.City,
                phone = o.Address.Phone,
                email = o.Address.Email
            },
            items = o.Items.Select(i => new
            {
                productId = i.ProductId,
                title = i.Title,
                price = i.Price,
                quantity = i.Quantity,
                lineTotal = i.LineTotal
            })
        }));
    }
}