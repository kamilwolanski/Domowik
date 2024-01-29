using AutoMapper;
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
        private readonly ITransationService _transationService;
        private readonly IValidator<CreateFamilyDto> _validator;

        public FamilyController(IFamilyService familyService, IValidator<CreateFamilyDto> validator, ITransationService transationService)
        {
            _familyService = familyService;
            _validator = validator;
            _transationService = transationService;
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

        [HttpPut("shopping-list")]
        public ActionResult UpdateShoppingList([FromBody] List<CreateShoppingListProductDto> dto)
        {
            _familyService.UpdateShoppingList(dto);
            return Ok();
        }

        [HttpGet("shopping-list")]
        public ActionResult<List<ShoppingListProductDto>> GetShoppingList()
        {
            var products = _familyService.GetShoppingListProducts();

            return Ok(products);
        }


    }
}
