namespace Domowik___WebAPI.Entities
{
    public class ShoppingList
    {
        public int Id { get; set; }

        public int? FamilyId { get; set; }
        public virtual Family? Family { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}
