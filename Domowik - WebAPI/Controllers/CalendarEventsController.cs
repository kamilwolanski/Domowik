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
        public ActionResult<List<CalendarEventsDto>> GetCalendarEvents()
        {
            var userId = _userContextService.GetUserId;
            var calendarEvents = _dbContext.CalendarEvents
                .Where(e => e.OrganizerId == userId);

            var calendarEventsDto = calendarEvents.Select(
                e => new CalendarEventsDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    StartDateTime = e.StartDateTime,
                    EndDateTime = e.EndDateTime,
                    OrganizerId = userId,
                    FamilyId = e.Organizer.FamilyId
                }
            );

            return Ok(calendarEventsDto);
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody] AddCalendarEventDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Name))
            {
                return BadRequest("Nieprawid³owe dane.");
            }
            return BadRequest("Nieprawid³owe dane.");
            var userId = _userContextService.GetUserId;

            var newEvent = new CalendarEvent
            {
                Name = dto.Name,
                Description = dto.Description,
                StartDateTime = dto.StartDateTime,
                EndDateTime = dto.EndDateTime,
                OrganizerId = userId
            };

            _dbContext.CalendarEvents.Add(newEvent);
            _dbContext.SaveChanges();

            return Ok(new { message = "Wydarzenie dodane pomyœlnie." });
        }
    }

    public class AddCalendarEventDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public List<string> Participants { get; set; }
    }
}
