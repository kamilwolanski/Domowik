namespace Domowik___WebAPI.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int ProductCategoryId { get; set; }
        public ProductCategory ProductCategory { get; set; }
        public List<ShoppingListProduct> ShoppingListProducts { get; set; }
    }
}
