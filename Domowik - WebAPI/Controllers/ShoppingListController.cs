using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/shopping-lists")]
    [ApiController]
    [Authorize]
    public class ShoppingListController : ControllerBase
    {
        private readonly IShoppingListsService _shoppingListsService;
        private readonly IValidator<CreateShoppingListDto> _createShoppingListValidator;
        private readonly IValidator<UpdateShoppingListDto> _updateShoppingListValidator;
        public ShoppingListController(IShoppingListsService shoppingListsService, IValidator<CreateShoppingListDto> createShoppingListValidator, IValidator<UpdateShoppingListDto> updateShoppingListValidator)
        {
            _shoppingListsService = shoppingListsService;
            _createShoppingListValidator = createShoppingListValidator;
            _updateShoppingListValidator = updateShoppingListValidator;
        }

        [HttpGet]
        public ActionResult<List<ShoppingListDto>> GetShoppingLists()
        {
            var shoppingLists = _shoppingListsService.GetAll();

            return Ok(shoppingLists);
        }

        [HttpPost]
        public async Task<ActionResult> CreateShoppingList([FromBody] CreateShoppingListDto dto)
        {
            var validationResult = await _createShoppingListValidator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                validationResult.AddToModelState(ModelState);
                return BadRequest(ModelState);
            }

            var shoppingId = await _shoppingListsService.Create(dto);

            return Created($"/api/family/shopping-lists/{shoppingId}", null);
        }

        [HttpGet("{id}")]
        public ActionResult<ShoppingListDto> GetShoppingList([FromRoute] int id)
        {
            var shoppingLists = _shoppingListsService.Get(id);

            return Ok(shoppingLists);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShoppingList([FromRoute] int id)
        {
            await _shoppingListsService.Delete(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateShoppingList([FromRoute] int id, [FromBody] UpdateShoppingListDto dto)
        {
            var validationResult = await _updateShoppingListValidator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                validationResult.AddToModelState(ModelState);
                return BadRequest(ModelState);
            }

            await _shoppingListsService.Update(id, dto);
            return Ok();
        }
    }
}
