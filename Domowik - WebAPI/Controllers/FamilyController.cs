using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Controllers
{
    [ApiController]
    [Route("api/family")]
    public class FamilyController : ControllerBase
    {
        private readonly IFamilyService _familyService;

        public FamilyController(IFamilyService familyService)
        {
               _familyService = familyService;
        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody] UpdateFamilyDto dto, [FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUpdated = _familyService.Update(id, dto);

            if (!isUpdated)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            var isDeleted = _familyService.Delete(id);

            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
        [HttpPost]
        public ActionResult CreateFamily([FromBody] CreateFamilyDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var familyId = _familyService.Create(dto);

            return Created($"/api/family/{familyId}", null);
        }

        [HttpGet]
        public ActionResult<IEnumerable<FamilyDto>> GetAll()
        {
            var families = _familyService.GetAll();

            return Ok(families);
        }

        [HttpGet("{id}")]
        public ActionResult<FamilyDto> Get([FromRoute] int id)
        {
            var family = _familyService.GetById(id);

            if (family == null)
            {
                return NotFound();
            }


            return Ok(family);
        }
    }
}
