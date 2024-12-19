namespace Domowik___WebAPI.Models
{
    public class AvailableProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ProductCategoryDto ProductCategory { get; set; }
        public int Quantity { get; set; } = 0;
        public bool IsPurchased { get; set; } = false;
        public int? ShoppingListProductId { get; set; }
        public string? ShoppingListProductName { get; set; }
    }
}
