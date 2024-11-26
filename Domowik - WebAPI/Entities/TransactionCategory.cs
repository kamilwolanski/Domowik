using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Entities
{
    public enum TransactionCategoryType
    {
        Income,
        Expense
    }

    public class TransactionCategory
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public TransactionCategoryType Type { get; set; }
    }
}
