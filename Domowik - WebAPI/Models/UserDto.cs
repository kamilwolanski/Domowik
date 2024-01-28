namespace Domowik___WebAPI.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }

        public int RoleId { get; set; }
        public int? FamilyId { get; set; }
    }
}
