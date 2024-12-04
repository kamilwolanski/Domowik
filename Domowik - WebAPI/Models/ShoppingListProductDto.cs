using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class ShoppingListProductDto
    {
        public int Id { get; set; }

        public ProductDto Product { get; set; }

        public int Quantity { get; set; }
        public bool IsPurchased { get; set; }
    }
}
