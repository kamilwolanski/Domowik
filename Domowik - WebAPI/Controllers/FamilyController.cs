﻿using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/family")]
    [ApiController]
    [Authorize]

    public class FamilyController : ControllerBase
    {
        private readonly IFamilyService _familyService;
        private readonly IValidator<CreateFamilyDto> _validator;

        public FamilyController(IFamilyService familyService, IValidator<CreateFamilyDto> validator)
        {
            _familyService = familyService;
            _validator = validator;
        }

        [HttpDelete("user/{id}")]
        public ActionResult DeleteUser([FromRoute] int id)
        {
            _familyService.DeleteUser(id);

            return Ok();
        }

        [HttpPost("add")]
        public ActionResult Add([FromBody] AddUserToFamilyDto dto)
        {
            _familyService.Add(dto);

            return Ok(true);
        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody] UpdateFamilyDto dto, [FromRoute] int id)
        {
            _familyService.Update(id, dto);


            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            _familyService.Delete(id);

            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> CreateFamily([FromBody] CreateFamilyDto dto)
        {
            await _validator.ValidateAndThrowAsync(dto);
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


            return Ok(family);
        }


    }
}
