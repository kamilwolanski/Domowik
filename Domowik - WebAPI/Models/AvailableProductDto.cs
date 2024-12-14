namespace Domowik___WebAPI.Models
{
    public class AvailableProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ProductCategoryDto ProductCategory { get; set; }
        public int Quantity { get; set; } = 1;
        public bool IsPurchased { get; set; } = false;
    }
}
