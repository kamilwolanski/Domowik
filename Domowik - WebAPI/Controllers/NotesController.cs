using Domowik___WebAPI.Data;
using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Note = Domowik___WebAPI.Entities.Note;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/notes")]
    [ApiController]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly IUserContextService _userContextService;
        private readonly DomowikDbContext _dbContext;
        public NotesController(IUserContextService userContextService, DomowikDbContext dbContext)
        {
            _userContextService = userContextService;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var userId = _userContextService.GetUserId;
            var notes = _dbContext.Notes.Where(e => e.UserId == userId);

            var notesDto = notes.Select(n => new NoteDto
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
            }).ToList();

            return Ok(notesDto);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNote([FromRoute] int id)
        {
            var userId = _userContextService.GetUserId;
            var notes = _dbContext.Notes.Where(e => e.UserId == userId);

            var note = notes.FirstOrDefault(e => e.Id == id);

            if (note == null) return NotFound();

            return Ok(note);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote([FromRoute] int id)
        {
            var userId = _userContextService.GetUserId;
            var notes = _dbContext.Notes.Where(e => e.UserId == userId);

            var note = notes.FirstOrDefault(e => e.Id == id);

            if (note == null) return NotFound();

            _dbContext.Notes.Remove(note);

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote([FromRoute] int id, [FromBody] UpdateNoteDto dto)
        {
            var userId = _userContextService.GetUserId;
            var notes = _dbContext.Notes.Where(e => e.UserId == userId);

            var note = notes.FirstOrDefault(e => e.Id == id);

            if (note == null) return NotFound();

            note.Title = dto.Title ?? note.Title;
            note.Content = dto.Content ?? note.Content;

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] UpdateNoteDto dto)
        {
            var userId = _userContextService.GetUserId;

            var note = new Note()
            {
                Title = dto.Title,
                Content = dto.Content,
                UserId = userId
            };

            _dbContext.Notes.Add(note);
            await _dbContext.SaveChangesAsync();

            return Created("", null);
        }

    }
}
