﻿using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/family")]
    [ApiController]
    [Authorize]

    public class FamilyController : ControllerBase
    {
        private readonly IFamilyService _familyService;
        private readonly IShoppingListsService _shoppingListsService;
        private readonly ITransationService _transationService;
        private readonly IValidator<CreateFamilyDto> _validator;
        private readonly IValidator<CreateShoppingListDto> _createShoppingListValidator;

        public FamilyController(IFamilyService familyService, IShoppingListsService shoppingListsService, IValidator<CreateFamilyDto> validator, IValidator<CreateShoppingListDto> createShoppingListValidator, ITransationService transationService)
        {
            _familyService = familyService;
            _shoppingListsService = shoppingListsService;
            _validator = validator;
            _transationService = transationService;
            _createShoppingListValidator = createShoppingListValidator;
        }


        [HttpDelete("transaction/{id}")]
        public ActionResult DeleteTransaction([FromRoute] int Id)
        {
            _transationService.DeleteTransaction(Id);

            return Ok();
        }

        [HttpPost("transaction")]
        public ActionResult AddTransation([FromBody] AddTransactionDto transaction)
        {
            _transationService.AddTransation(transaction);

            return Ok();
        }

        [HttpGet("finances")]
        public ActionResult<FinanceDto> GetFinances()
        {
            var transactions = _transationService.GetFinances();

            return Ok(transactions);
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

        [HttpDelete]
        public ActionResult Delete()
        {
            _familyService.Delete();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> CreateFamily([FromBody] CreateFamilyDto dto)
        {
            var validationResult = await _validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                validationResult.AddToModelState(ModelState);
                return BadRequest(ModelState);
            }
            var familyId = await _familyService.Create(dto);

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
