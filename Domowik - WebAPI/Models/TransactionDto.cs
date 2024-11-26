using Domowik___WebAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Models
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }

        public int Count { get; set; }
        public DateTime CreatedDate { get; set; }

        public UserDto User { get; set; }
    }
}
