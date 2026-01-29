using Microsoft.AspNetCore.Mvc;

namespace e_commercedsw.backend.Data
{
    public static class OrdersStore
    {
        public static int NextId = 1;
        public static readonly List<Order> Orders = new();
    }

    public class Order
    {
        public int Id { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public string DeliveryMethod { get; set; } = "";
        public Address Address { get; set; } = new();
        public List<OrderItem> Items { get; set; } = new();
        public decimal Total { get; set; }
    }

    public class Address
    {
        public string FullName { get; set; } = "";
        public string AddressLine { get; set; } = ""; 
        public string PostalCode { get; set; } = "";
        public string City { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; } = "";
    }

    public class OrderItem
    {
        public int ProductId { get; set; }
        public string Title { get; set; } = "";
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
