using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Models
{
    public class AddTransactionDto
    {
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }

        [Required]
        public int Count { get; set; }
    }
}
