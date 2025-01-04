namespace Domowik___WebAPI.Models
{
    public class UpdateEventDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public List<int> ParticipantIds { get; set; }
    }
}
