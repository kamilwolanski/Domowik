using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Entities
{
    public class Family
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int HeadId { get; set; }
        public User Head { get; set; }

        public List<User> Members { get; set; }

        public List<ShoppingList> ShoppingLists { get; set; }
        public List<Transaction> Transactions { get; set; }
        public ICollection<CalendarEvent> Events { get; set; }

    }
}
