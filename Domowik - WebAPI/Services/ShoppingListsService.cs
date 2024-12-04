using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Exceptions;
using Domowik___WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Services
{
    public interface IShoppingListsService
    {
        Task<int> Create(CreateShoppingListDto createShoppingListDto);
        Task Update(int id, UpdateShoppingListDto shoppingListProductDto);
        List<ShoppingListDto> GetAll();
        ShoppingListDto Get(int id);
        Task Delete(int shoppingListId);
    }
    public class ShoppingListsService : IShoppingListsService
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;
        private readonly IUserService _userService;
        public ShoppingListsService(DomowikDbContext dbContext, IMapper mapper, IUserService userService, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userContextService = userContextService;
            _userService = userService;
        }
        public async Task<int> Create(CreateShoppingListDto createShoppingListDto)
        {
            var userFamily = await _userService.GetUserFamily();

            var shoppingList = _mapper.Map<ShoppingList>(createShoppingListDto);
            userFamily.ShoppingLists.Add(shoppingList);
            await _dbContext.SaveChangesAsync();

            return shoppingList.Id;
        }

        public ShoppingListDto Get(int id)
        {
            var userId = _userContextService.GetUserId;
            var userFamily = _dbContext.Families
                .Include(f => f.ShoppingLists)
                .ThenInclude(x => x.ShoppingListProducts)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.ProductCategory)
                .SingleOrDefault(f => f.Members.Any(m => userId == m.Id));

            var familyShoppingList = userFamily.ShoppingLists.SingleOrDefault(sl => sl.Id == id);

            var shoppingList = _mapper.Map<ShoppingListDto>(familyShoppingList);

            return shoppingList;
        }

        public List<ShoppingListProductDto> GetShoppingListProducts()
        {
            var userId = _userContextService.GetUserId;
            var userFamily = _dbContext.Families
                 .Include(x => x.Members)
                 .Include(x => x.ShoppingLists).ThenInclude(x => x.ShoppingListProducts)
                 .AsNoTracking()
                 .SingleOrDefault(x => x.Members.Any(x => userId == x.Id));

            var products = _mapper.Map<List<ShoppingListProductDto>>(userFamily.ShoppingLists);

            return products;
        }

        public List<ShoppingListDto> GetAll()
        {
            var userId = _userContextService.GetUserId;
            var userFamily = _dbContext.Families
                .Include(x => x.Members)
                .Include(x => x.ShoppingLists)
                .ThenInclude(x => x.ShoppingListProducts)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.ProductCategory)
                .SingleOrDefault(f => f.Members.Any(m => userId == m.Id));

            var shoppingLists = _mapper.Map<List<ShoppingListDto>>(userFamily.ShoppingLists);

            return shoppingLists;
        }

        public async Task Update(int id, UpdateShoppingListDto shoppingListProductDto)
        {
            var shoppingList = await _dbContext.ShoppingLists
                 .FirstOrDefaultAsync(sl => sl.Id == id);

            if (shoppingList == null)
            {
                throw new NotFoundException($"Shopping list with ID {id} not found");
            }

            var userFamily = await _userService.GetUserFamily();

            if (shoppingList.FamilyId != userFamily.Id)
            {
                throw new ForbidException();
            }

            _mapper.Map(shoppingListProductDto, shoppingList);

            await _dbContext.SaveChangesAsync();

        }

        public async Task Delete(int shoppingListId)
        {
            var shoppingList = await _dbContext.ShoppingLists
                .FirstOrDefaultAsync(sl => sl.Id == shoppingListId);

            if (shoppingList == null)
            {
                throw new NotFoundException($"Shopping list with ID {shoppingListId} not found");
            }

            var userFamily = await _userService.GetUserFamily();

            if (shoppingList.FamilyId != userFamily.Id)
            {
                throw new ForbidException();
            }

            _dbContext.ShoppingLists.Update(shoppingList);
            await _dbContext.SaveChangesAsync();
        }
    }
}
