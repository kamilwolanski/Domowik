using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Services
{
    public interface IShoppingListsService
    {
        Task<(ShoppingList? shoppingList, ActionResult? errorResult)> ValidateShoppingListAccessAsync(int id);


    }
    public class ShoppingListsService : IShoppingListsService
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IUserContextService _userContextService;

        public ShoppingListsService(DomowikDbContext dbContext, IMapper mapper, IUserService userService, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _userContextService = userContextService;
        }

        public async Task<(ShoppingList? shoppingList, ActionResult? errorResult)> ValidateShoppingListAccessAsync(int id)
        {
            var shoppingList = await _dbContext.ShoppingLists
                .Include(sl => sl.Family)
                    .ThenInclude(f => f.Members)
                .Include(sl => sl.ShoppingListProducts)
                    .ThenInclude(sl => sl.Product)
                    .ThenInclude(sl => sl.ProductCategory)
                .FirstOrDefaultAsync(sl => sl.Id == id);

            if (shoppingList == null)
            {
                return (null, new NotFoundObjectResult(new { message = "Shopping list not found" }));
            }

            if (!shoppingList.Family.Members.Any(m => m.Id == _userContextService.GetUserId))
            {
                return (null, new ForbidResult());
            }

            return (shoppingList, null);
        }

    }
}
