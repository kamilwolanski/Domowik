using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Models
{
    public class UpdateShoppingListProductDto
    {
        [StringLength(50)]
        public string? Name { get; set; }

        [Range(0, int.MaxValue)]
        public int? Quantity { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(20)]
        public string? Unit { get; set; }
    }
}
