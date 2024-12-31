using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class CalendarEventsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int? OrganizerId { get; set; }
        public User Organizer { get; set; }
        public int? FamilyId { get; set; }
        public Family Family { get; set; }

    }
}