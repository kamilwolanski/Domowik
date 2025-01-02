using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class SenderDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
    public class InvitationDto
    {
        public int Id { get; set; }

        public string Token { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }

        public string FamilyName { get; set; }
        public SenderDto Sender { get; set; }
    }
}
