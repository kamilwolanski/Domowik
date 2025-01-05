using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Exceptions;
using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using static Domowik___WebAPI.Models.ParticipantDto;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/calendar-events")]
    [ApiController]
    [Authorize]
    public class CalendarEventsController : ControllerBase
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IUserContextService _userContextService;

        public CalendarEventsController(IUserContextService userContextService, DomowikDbContext domowikDbContext)
        {
            _dbContext = domowikDbContext;
            _userContextService = userContextService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CalendarEventsDto>>> GetCalendarEvents()
        {
            var userId = _userContextService.GetUserId;
            var userFamily = await _dbContext.Families.Include(f => f.Members).FirstOrDefaultAsync(x => x.Members.Any(m => m.Id == userId));

            if(userFamily == null)
            {
                return BadRequest("Nie znaleziono rodziny");
            }

            var calendarEvents = _dbContext.CalendarEvents
                .Include(f => f.Members)
                .Where(e => e.FamilyId == userFamily.Id);

            var calendarEventsDto = calendarEvents.Select(
                e => new CalendarEventsDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    StartDateTime = e.StartDateTime,
                    EndDateTime = e.EndDateTime,
                    Organizer = new OrganizerEventDto()
                    {
                        Id = e.Organizer.Id,
                        FirstName = e.Organizer.FirstName,
                        LastName = e.Organizer.LastName,
                    },
                    Participants = e.Members.Select(m => new ParticipantDto
                    {
                        Id = m.Id,
                        FirstName = m.FirstName,
                        LastName = m.LastName
                    }).ToList()
                }
            ).ToList();

            return Ok(calendarEventsDto);
        }

        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody] AddCalendarEventDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Name))
            {
                return BadRequest("Nieprawid³owe dane.");
            }

            var userId = _userContextService.GetUserId;
            var userFamilyId = _dbContext.Users
                .Where(u => u.Id == userId)
                .Select(u => u.FamilyId)
                .FirstOrDefault();

            var eventParticipants = new List<User>();
            if (dto.ParticipantIds != null && dto.ParticipantIds.Any())
            {
                eventParticipants = await _dbContext.Users
                    .Where(u => dto.ParticipantIds.Contains(u.Id))
                    .ToListAsync();
            }

            var newEvent = new CalendarEvent
            {
                Name = dto.Name,
                Description = dto.Description,
                StartDateTime = dto.StartDateTime,
                EndDateTime = dto.EndDateTime,
                OrganizerId = userId,
                FamilyId = userFamilyId,
                Members = eventParticipants,
            };

            _dbContext.CalendarEvents.Add(newEvent);
            await _dbContext.SaveChangesAsync();
            

            _dbContext.SaveChanges();

            return Ok(new { message = "Wydarzenie dodane pomyœlnie." });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShoppingList([FromRoute] int id)
        {
            var userId = _userContextService.GetUserId;
            var calendarEvent = await _dbContext.CalendarEvents.FirstOrDefaultAsync(e => e.Id == id);
            var user = await _dbContext.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return BadRequest("Nie znaleziono u¿ytkownika");
            }

            if (calendarEvent == null) return NotFound("Nie znaleziono wydarzenia o podanym id");

            if ((user.RoleId != 3 && calendarEvent.OrganizerId != userId))
            {
                return Forbid("Brak uprawnieñ do usuniêcia wydarzenia");
            }

            _dbContext.CalendarEvents.Remove(calendarEvent);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateEvent([FromRoute] int id, [FromBody] UpdateEventDto dto)
        {
            var userId = _userContextService.GetUserId;
            var user = await _dbContext.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == userId);
            var userFamily = await _dbContext.Families.Include(f => f.Members).FirstOrDefaultAsync(x => x.Members.Any(m => m.Id == userId));

            if(user == null)
            {
                return BadRequest("Nie znaleziono u¿ytkownika");
            }

            if (userFamily == null)
            {
                return BadRequest("Nie znaleziono rodziny");
            }

            var calendarEvent = await _dbContext.CalendarEvents.Include(e => e.Members).FirstOrDefaultAsync(e => e.Id == id);

            if(calendarEvent == null)
            {
                return NotFound("Nie znaleziono wydarzenia o podanym id");
            }

            if(userFamily.Id != calendarEvent.FamilyId)
            {
                return BadRequest("Wydarzenie nie nale¿y do Twojej rodziny");
            }


            if((user.RoleId != 3 && calendarEvent.OrganizerId != userId))
            {
                return Forbid("Brak uprawnieñ do edycji wydarzenia");
            }

            var eventParticipants = new List<User>();
            if (dto.ParticipantIds != null && dto.ParticipantIds.Any())
            {
                eventParticipants = await _dbContext.Users
                    .Where(u => dto.ParticipantIds.Contains(u.Id))
                    .ToListAsync();
            }

            calendarEvent.Name = dto.Name ?? calendarEvent.Name;
            calendarEvent.Description = dto.Description ?? calendarEvent.Description;
            calendarEvent.StartDateTime = dto.StartDateTime;
            calendarEvent.EndDateTime = dto.EndDateTime;
            calendarEvent.Members = eventParticipants;


            await _dbContext.SaveChangesAsync();

            return NoContent();

        }
    }

}
