namespace e_commercedsw.backend.Data;

public static class ProductsStore
{
    public static readonly List<Product> Products =
    [
        new Product { Id = 1, Title = "PlayStation 5 Pro", Price = 1999.99m, ImageUrl = "", StockQuantity = 50 },
        new Product { Id = 2, Title = "DualSense Controller", Price = 299.99m, ImageUrl = "", StockQuantity = 100 },
        new Product { Id = 3, Title = "Headset", Price = 499.99m, ImageUrl = "", StockQuantity = 30 },
    ];
}

public class Product
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int StockQuantity { get; set; }
}