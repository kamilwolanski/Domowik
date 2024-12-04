using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ProductCategoryDto ProductCategory { get; set; }
    }
}
