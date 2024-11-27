using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class TransactionCategoryDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public TransactionCategoryType Type { get; set; }
    }
}
