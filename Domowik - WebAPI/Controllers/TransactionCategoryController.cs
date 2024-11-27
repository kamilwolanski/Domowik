using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/transaction-categories")]
    [ApiController]
    public class TransactionCategoryController : ControllerBase
    {

        private readonly ITransactionCategoryService _transactionCategoryService;
        public TransactionCategoryController(ITransactionCategoryService transactionCategoryService)
        {

            _transactionCategoryService = transactionCategoryService;   

        }

        [HttpGet]
        public async Task<ActionResult<TransactionCategoryDto>> GetTransactionCategories([FromQuery] TransactionCategoryType? type)
        {

            var transactions = await _transactionCategoryService.GetTransactionCategories(type);

            return Ok(transactions);
        }

    }
}
