using Microsoft.AspNetCore.Mvc;

namespace e_commercedsw.backend.Models
{
    public record AddressDto(string FullName, string Address, string PostalCode, string City, string Phone, string Email);
    public record CreateOrderDto(string DeliveryMethod, AddressDto Address);
}
