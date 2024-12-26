namespace Domowik___WebAPI.Entities
{
    public enum InvitationStatus
    {
        Pending,    
        Accepted,   
        Expired,    
        Cancelled   
    }

    public class Invitation
    {
        public int Id { get; set; }

        public string Token { get; set; } 

        public int FamilyId { get; set; }
        public Family Family { get; set; }

        public int SenderId { get; set; }
        public User Sender { get; set; } 

        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; } 

    }
}
