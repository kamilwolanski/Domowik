using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Models
{
    public class UpdateFamilyDto
    {
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
    }
}
