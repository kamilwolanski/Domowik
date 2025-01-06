using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class OrganizerEventDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class ParticipantDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class CalendarEventsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public OrganizerEventDto Organizer { get; set; }
        public List<ParticipantDto> Participants { get; set; }

    }
}