using Domowik___WebAPI.Models;

namespace Domowik___WebAPI.Entities
{
    public class CalendarEvent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int? OrganizerId { get; set; }
        public User Organizer { get; set; }
        public List<User> Members { get; set; }
        public int? FamilyId { get; set; }
        public Family Family { get; set; }
    }
}
