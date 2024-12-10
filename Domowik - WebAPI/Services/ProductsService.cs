using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Services
{
    public interface IProductsService
    {
        Task<List<ProductDto>> GetAll();
    }
    public class ProductsService : IProductsService
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IMapper _mapper;

        public ProductsService(DomowikDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<List<ProductDto>> GetAll()
        {
            var products = await _dbContext.Products.Include(p => p.ProductCategory).ToListAsync();
            return _mapper.Map<List<ProductDto>>(products);
        }

    }
}
