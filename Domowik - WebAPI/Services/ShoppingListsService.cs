using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Exceptions;
using Domowik___WebAPI.Migrations;
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
        Task ToggleProductPurchased(int id, int productId);
        Task<IEnumerable<AvailableProductDto>> GetAvailableProducts(int id);
        Task AddProductToShoppingList (int id, AddProductToShoppingListDto dto);
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
            var userId = _userContextService.GetUserId;
            var userFamily = await _dbContext.Families.Include(f => f.Members).Include(f => f.ShoppingLists).FirstOrDefaultAsync();

            var shoppingList = _mapper.Map<ShoppingList>(createShoppingListDto);

            if (userFamily == null)
            {
                throw new NotFoundException("Family not Found");
            }

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

        public IEnumerable<ShoppingListProductDto> GetShoppingListProducts()
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
            var userId = _userContextService.GetUserId;
            var shoppingList = await _dbContext.ShoppingLists
                 .FirstOrDefaultAsync(sl => sl.Id == id);

            if (shoppingList == null)
            {
                throw new NotFoundException($"Shopping list with ID {id} not found");
            }

            var userFamily = await _dbContext.Families.Include(f => f.Members).FirstOrDefaultAsync(f => f.Members.Any(m => m.Id == userId));

            if (userFamily == null)
            {
                throw new NotFoundException("Family not Found");
            }

            if (shoppingList.FamilyId != userFamily.Id)
            {
                throw new ForbidException();
            }

            _mapper.Map(shoppingListProductDto, shoppingList);

            await _dbContext.SaveChangesAsync();

        }

        public async Task Delete(int shoppingListId)
        {
            var userId = _userContextService.GetUserId;
            var shoppingList = await _dbContext.ShoppingLists
                .FirstOrDefaultAsync(sl => sl.Id == shoppingListId);

            if (shoppingList == null)
            {
                throw new NotFoundException($"Shopping list with ID {shoppingListId} not found");
            }

            var userFamily = await _dbContext.Families.Include(f => f.Members).Include(f => f.ShoppingLists).FirstOrDefaultAsync(f => f.Members.Any(m => m.Id == userId));

            if (userFamily == null)
            {
                throw new NotFoundException("Family not Found");
            }

            if (shoppingList.FamilyId != userFamily.Id)
            {
                throw new ForbidException();
            }

            _dbContext.ShoppingLists.Remove(shoppingList);
            await _dbContext.SaveChangesAsync();
        }

        public async Task ToggleProductPurchased(int id, int productId)
        {
            var userId = _userContextService.GetUserId;
            var userFamily = await _dbContext.Families.Include(f => f.Members).Include(f => f.ShoppingLists).FirstOrDefaultAsync(f => f.Members.Any(m => m.Id == userId));

            if (userFamily == null)
            {
                throw new NotFoundException("Family not Found");
            }

            var product = await _dbContext.ShoppingListProducts
                .FirstOrDefaultAsync(p => p.ShoppingListId == id && p.ProductId == productId);

            if (product == null)
            {
                throw new NotFoundException("Product not found in the shopping list.");
            }

            if (!userFamily.ShoppingLists.Any(sl => sl.Id == product.ShoppingListId))
            {
                throw new ForbidException();
            }

 

            product.IsPurchased = !product.IsPurchased;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<AvailableProductDto>> GetAvailableProducts(int id)
        {
            var userId = _userContextService.GetUserId;

            var shoppingList = await _dbContext.ShoppingLists.Include(sl => sl.Family).ThenInclude(f => f.Members).FirstOrDefaultAsync(sl => sl.Id == id);

            if(!shoppingList.Family.Members.Any(m => m.Id == userId))
            {
                throw new ForbidException();
            }

            var productsToAdd = await _dbContext.Products.Include(p => p.ProductCategory)
                .Select(p => new AvailableProductDto
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
                        .FirstOrDefault()
                }).ToListAsync();
                


            return productsToAdd;

        }

        public async Task AddProductToShoppingList(int id, AddProductToShoppingListDto dto)
        {
            var userId = _userContextService.GetUserId;

            var shoppingList = await _dbContext.ShoppingLists.Include(sl => sl.ShoppingListProducts).Include(sl => sl.Family).ThenInclude(f => f.Members).FirstOrDefaultAsync(sl => sl.Id == id);

            if (!shoppingList.Family.Members.Any(m => m.Id == userId))
            {
                throw new ForbidException();
            }

            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == dto.ProductId);

            if (product == null)
            {
                throw new NotFoundException("Product not found.");
            }

            var existingProduct = shoppingList.ShoppingListProducts.FirstOrDefault(x => x.ProductId == dto.ProductId);
            if(existingProduct == null)
            {
                var shoppingListProduct = new ShoppingListProduct
                {
                    Product = product,
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity,
                };

                shoppingList.ShoppingListProducts.Add(shoppingListProduct);
            } else
            {
                existingProduct.Quantity = dto.Quantity;
            }
 
            await _dbContext.SaveChangesAsync();
        }
    }
}
