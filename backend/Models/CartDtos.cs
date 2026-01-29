namespace e_commercedsw.backend.Models
{
    public record AddCartItemDto(int ProductId, int Quantity);
    public record UpdateCartItemDto(int Quantity);

    public record CartItemDto(
        int Id,             
        int ProductId,
        string Title,
        decimal Price,
        int SelectedQuantity,
        int StockQuantity,
        string? ImageUrl
    );

    public record CartDto(List<CartItemDto> Items);
}
