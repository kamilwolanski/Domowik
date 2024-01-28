namespace Domowik___WebAPI.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }

        public int ShoppingListId { get; set; }
        public virtual ShoppingList ShoppingList { get; set; }
    }
}
