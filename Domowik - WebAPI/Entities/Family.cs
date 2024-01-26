using System.ComponentModel.DataAnnotations;

namespace Domowik___WebAPI.Entities
{
    public class Family
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int HeadId { get; set; }
        public virtual User Head { get; set; }
        
        public virtual List<User> Members { get; set; }
        
    }
}
