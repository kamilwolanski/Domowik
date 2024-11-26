namespace Domowik___WebAPI.Entities
{
    public class Transaction
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int Count { get; set; }

        public DateTime CreatedDate { get; set; }
        public int CategoryId { get; set; }
        public TransactionCategory Category { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int? FamilyId { get; set; }
        public virtual Family? Family { get; set; }

        
    }
}
