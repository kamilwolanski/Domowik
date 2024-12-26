using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Models
{
    public class AddProductDto
    {
        [Required]
        public int ProductId { get; set; }
    }
}
