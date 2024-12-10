using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _productsService;
        public ProductsController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetShoppingLists()
        {
            var products = await _productsService.GetAll();

            return Ok(products);
        }
    }
}
