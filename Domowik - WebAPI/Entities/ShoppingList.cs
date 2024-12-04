namespace Domowik___WebAPI.Entities
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? FamilyId { get; set; }
        public Family? Family { get; set; }

        public List<ShoppingListProduct> ShoppingListProducts { get; set; }
    }
}
