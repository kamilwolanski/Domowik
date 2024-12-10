namespace Domowik___WebAPI.Entities
{
    public class ShoppingListProduct
    {
        public int Id { get; set; }

        public int ShoppingListId { get; set; }
        public ShoppingList ShoppingList { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantity { get; set; } = 1;
        public bool IsPurchased { get; set; } = false;
        public string? Unit {  get; set; }
    }
}
