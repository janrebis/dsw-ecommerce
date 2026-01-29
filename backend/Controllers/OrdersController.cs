using e_commercedsw.backend.Data;
using e_commercedsw.backend.Database;
using e_commercedsw.backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace e_commercedsw.backend.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _db;
    public OrdersController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrderDto dto)
    {
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

   
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _db.Orders
            .Include(o => o.Items)
            .OrderByDescending(o => o.CreatedAtUtc)
            .AsNoTracking()
            .ToListAsync();

        return Ok(orders.Select(o => new
        {
            id = o.Id,
            createdAt = o.CreatedAtUtc,
            deliveryMethod = o.DeliveryMethod,
            total = o.Total,
            address = o.Address,
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