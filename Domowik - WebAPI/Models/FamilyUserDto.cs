using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class FamilyUserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int RoleId { get; set; }

    }
}
