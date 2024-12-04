using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class ShoppingListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<ShoppingListProductDto> ShoppingListProducts { get; set; }
    }
}
