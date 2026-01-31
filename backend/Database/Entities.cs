namespace e_commercedsw.backend.Database
{
    public class ProductEntity
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public int StockQuantity { get; set; }
    }

    public class OrderEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
        public string DeliveryMethod { get; set; } = "";
        public OrderAddress Address { get; set; } = new();
        public List<OrderItemEntity> Items { get; set; } = new();
        public decimal Total { get; set; }
        public string UserId { get; set; } = "";
    }

    public class OrderAddress
    {
        public string FullName { get; set; } = "";
        public string Address { get; set; } = "";
        public string PostalCode { get; set; } = "";
        public string City { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; } = "";
    }

    public class OrderItemEntity
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public OrderEntity Order { get; set; } = null!;

        public int ProductId { get; set; }
        public string Title { get; set; } = "";
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal LineTotal { get; set; }
    }
}
