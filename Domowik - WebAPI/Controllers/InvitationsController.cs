using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Controllers
{
    [ApiController]
    [Route("api/invitations")]
    public class InvitationsController : ControllerBase
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IUserContextService _userContextService;
        public InvitationsController(DomowikDbContext dbContext, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _userContextService = userContextService;
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> GetOrCreateInvitation()
        {
            var senderId = _userContextService.GetUserId;
            var family = await _dbContext.Families
                .Include(f => f.Members)
                .FirstOrDefaultAsync(f => f.Members.Any(m => m.Id == senderId));

            if (family == null)
            {
                return NotFound();
            }

            var existingInvitation = await _dbContext.Invitations
                .FirstOrDefaultAsync(i => i.FamilyId == family.Id && i.ExpiresAt > DateTime.UtcNow);

            if (existingInvitation != null)
            {
                return Ok(new { existingInvitation.Token });
            }

            var token = Guid.NewGuid().ToString();
            var newInvitation = new Invitation
            {
                Token = token,
                FamilyId = family.Id,
                SenderId = senderId,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(7)
            };

            _dbContext.Invitations.Add(newInvitation);
            await _dbContext.SaveChangesAsync();

            return Ok(new { token });
        }


        [HttpGet]
        public async Task<IActionResult> GetInvitationAsync([FromQuery] string token)
        {
            var invitation = await _dbContext.Invitations.Include(i => i.Sender).Include(i => i.Family).FirstOrDefaultAsync(f => f.Token == token);

            if(invitation == null) { return NotFound("Invalid token"); }


            if (invitation.ExpiresAt <= DateTime.UtcNow)
            {
                await _dbContext.SaveChangesAsync();
                return BadRequest("Zaproszenie wygasło");
            }

            var invitationDto = new InvitationDto
            {
                Id = invitation.Id,
                Token = invitation.Token,
                CreatedAt = invitation.CreatedAt,
                ExpiresAt = invitation.ExpiresAt,
                Sender = new SenderDto
                {
                    FirstName = invitation.Sender.FirstName,
                    LastName = invitation.Sender.LastName
                },
                FamilyName = invitation.Family.Name
            };

            return Ok(invitationDto);

        }

        [Authorize]
        [HttpPost("use")]
        public async Task<IActionResult> UseInvitation([FromQuery] string token)
        {
            var invitation = await _dbContext.Invitations.Include(i => i.Sender).Include(i => i.Family).FirstOrDefaultAsync(f => f.Token == token);
            var userId = _userContextService.GetUserId;
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            var family = await _dbContext.Families.Include(f => f.Members).FirstOrDefaultAsync(f => f.Members.Any(m => userId == m.Id));

            if (user == null)
            {
                return BadRequest("Nie znaleziono użytkownika");
            }

            if (invitation == null) { return NotFound("Nieprawidłowy token"); }

            if (invitation.ExpiresAt <= DateTime.UtcNow)
            {
                return BadRequest("Zaproszenie wygasło");
            }

            if(user.Family != null)
            {
                return BadRequest("Użytkownik już należy do rodziny");
            }

            var familyToJoin = invitation.Family;
            familyToJoin.Members.Add(user);
            await _dbContext.SaveChangesAsync();

            return Ok("You have successfully joined the family.");
        }

    }
}
