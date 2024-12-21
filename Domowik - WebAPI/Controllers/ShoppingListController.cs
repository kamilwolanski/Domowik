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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/shopping-lists")]
    [ApiController]
    [Authorize]
    public class ShoppingListController : ControllerBase
    {
        private readonly IShoppingListsService _shoppingListsService;
        private readonly IUserContextService _userContextService;
        private readonly IMapper _mapper;
        private readonly DomowikDbContext _dbContext;
        public ShoppingListController(IShoppingListsService shoppingListsService, IMapper mapper, IUserContextService userContextService, DomowikDbContext dbContext)
        {
            _shoppingListsService = shoppingListsService;
            _userContextService = userContextService;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<ShoppingListDto>> GetShoppingLists()
        {
            var userId = _userContextService.GetUserId;
            var userFamily = _dbContext.Families
                .Include(x => x.Members)
                .Include(x => x.ShoppingLists)
                .ThenInclude(x => x.ShoppingListProducts)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.ProductCategory)
                .SingleOrDefault(f => f.Members.Any(m => userId == m.Id));


            if (userFamily == null)
            {
                return NotFound(new { message = "User family not found" });
            }

            var shoppingLists = _mapper.Map<List<ShoppingListDto>>(userFamily.ShoppingLists);


            return Ok(shoppingLists);
        }


        [HttpPost]
        public async Task<ActionResult> CreateShoppingList([FromBody] CreateShoppingListDto dto)
        {
            var userId = _userContextService.GetUserId;
            var userFamily = await _dbContext.Families.Include(f => f.Members).Include(f => f.ShoppingLists).FirstOrDefaultAsync(f => f.Members.Any(m => m.Id == userId));

            var shoppingList = _mapper.Map<ShoppingList>(dto);

            if (userFamily == null)
            {
                return NotFound(new { message = "Family not Found" });
            }

            userFamily.ShoppingLists.Add(shoppingList);
            await _dbContext.SaveChangesAsync();


            return Created($"/api/family/shopping-lists/{shoppingList.Id}", null);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingListDto>> GetShoppingList([FromRoute] int id)
        {
            var (shoppingList, errorResult) = await _shoppingListsService.ValidateShoppingListAccessAsync(id);

            if (errorResult != null) return errorResult;


            var shoppingListDto = _mapper.Map<ShoppingListDto>(shoppingList);

            return Ok(shoppingListDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShoppingList([FromRoute] int id)
        {
            var (shoppingList, errorResult) = await _shoppingListsService.ValidateShoppingListAccessAsync(id);

            if (errorResult != null) return errorResult;

            _dbContext.ShoppingLists.Remove(shoppingList!);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateShoppingList([FromRoute] int id, [FromBody] UpdateShoppingListDto dto)
        {
            var (shoppingList, errorResult) = await _shoppingListsService.ValidateShoppingListAccessAsync(id);

            if (errorResult != null) return errorResult;

            _mapper.Map(dto, shoppingList);

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("{id}/products/{productId}/toggle-purchased")]
        public async Task<ActionResult> ToggleProductPurchased([FromRoute] int id, [FromRoute] int productId)
        {
            var (shoppingList, errorResult) = await _shoppingListsService.ValidateShoppingListAccessAsync(id);

            if (errorResult != null) return errorResult;

            var product = shoppingList!.ShoppingListProducts.FirstOrDefault(p => p.ProductId == productId);

            if (product == null)
            {
                return NotFound(new { message = "Product not found in the shopping list" });
            }

            product.IsPurchased = !product.IsPurchased;
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/available-products")]
        public async Task<ActionResult> GetAvailableProducts(
        [FromRoute] int id,
        [FromQuery] string? name = null,
        [FromQuery] int? limit = null
        )
        {
            var (shoppingList, errorResult) = await _shoppingListsService.ValidateShoppingListAccessAsync(id);

            if (errorResult != null) return errorResult;

            IQueryable<Product> query = _dbContext.Products;

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }

            if (limit.HasValue)
            {
                query = query.Take(limit.Value);
            }

            var availableProducts = await query.Select(p => new AvailableProductDto
            {
                Id = p.Id,
                Name = p.Name,
                ProductCategory = new ProductCategoryDto
                {
                    Id = p.ProductCategory.Id,
                    Name = p.ProductCategory.Name,
                },
                Quantity = p.ShoppingListProducts
                    .Where(slp => slp.ShoppingListId == id)
                    .Select(slp => slp.Quantity)
                    .FirstOrDefault(),
                IsPurchased = p.ShoppingListProducts
                    .Where(slp => slp.ShoppingListId == id)
                    .Select(slp => slp.IsPurchased)
                    .FirstOrDefault(),
                ShoppingListProductId = p.ShoppingListProducts
                    .Where(slp => slp.ShoppingListId == id)
                    .Select(slp => slp.Id)
                    .FirstOrDefault(),
                ShoppingListProductName = p.ShoppingListProducts
                    .Where(slp => slp.ShoppingListId == id)
                    .Select(slp => slp.Name)
                    .FirstOrDefault()
            }).ToListAsync();

            return Ok(availableProducts);
        }


        [HttpPost("{id}/products")]
        public async Task<ActionResult> AddProductToShoppingList([FromRoute] int id, [FromBody] AddProductDto dto)
        {
            var (shoppingList, errorResult) = await _shoppingListsService.ValidateShoppingListAccessAsync(id);

            if (errorResult != null) return errorResult;

            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == dto.ProductId);

            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            if (shoppingList!.ShoppingListProducts.Any(p => p.Name == product.Name))
            {
                return BadRequest(new { message = "Product is already in your list" });
            }

            var shoppingListProduct = new ShoppingListProduct
            {
                Name = product.Name,
                Product = product,
                ProductId = dto.ProductId,
            };

            shoppingList.ShoppingListProducts.Add(shoppingListProduct);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{id}/products/{shoppingListProductId}")]
        public async Task<ActionResult> UpdateProductInShoppingList([FromRoute] int id, [FromRoute] int shoppingListProductId, [FromBody] UpdateShoppingListProductDto dto)
        {
            var (shoppingList, errorResult) = await _shoppingListsService.ValidateShoppingListAccessAsync(id);

            if (errorResult != null) return errorResult;

            var product = shoppingList!.ShoppingListProducts.FirstOrDefault(sl => sl.Id == shoppingListProductId);

            if (product == null)
            {
                return NotFound(new { message = "Product not found in the shopping list" });
            }

            product.Name = dto.Name ?? product.Name;
            product.Description = dto.Description ?? product.Description;
            product.Unit = dto.Unit ?? product.Unit;
            product.Quantity = dto.Quantity ?? product.Quantity;

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}/products/{shoppingListProductId}")]
        public async Task<ActionResult> DeleteProductFromShoppingList([FromRoute] int id, [FromRoute] int shoppingListProductId)
        {
            var (shoppingList, errorResult) = await _shoppingListsService.ValidateShoppingListAccessAsync(id);

            if (errorResult != null) return errorResult;

            var product = shoppingList!.ShoppingListProducts.FirstOrDefault(sl => sl.Id == shoppingListProductId);

            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            shoppingList.ShoppingListProducts.Remove(product);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
