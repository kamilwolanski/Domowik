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
            Console.WriteLine("Pocz¹tek metody GetCalendarEvents");
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




    }
}