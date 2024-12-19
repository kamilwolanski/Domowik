using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Models
{
    public class UpdateShoppingListDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
    }
}
