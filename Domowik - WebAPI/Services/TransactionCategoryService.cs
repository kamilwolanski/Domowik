using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Services
{
    public interface ITransactionCategoryService
    {
        Task<List<TransactionCategoryDto>> GetTransactionCategories(TransactionCategoryType? type);
    }
    public class TransactionCategoryService : ITransactionCategoryService
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<FamilyService> _logger;

        public TransactionCategoryService(DomowikDbContext dbContext, IMapper mapper, ILogger<FamilyService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<TransactionCategoryDto>> GetTransactionCategories(TransactionCategoryType? type)
        {
            IQueryable<TransactionCategory> query;

            if (type.HasValue)
            {
                query = _dbContext.TransactionCategories.Where(c => c.Type == type);
            }
            else
            {
                query = _dbContext.TransactionCategories;
            }

            var transactionCategories = await query.ToListAsync();

            var categories = _mapper.Map<List<TransactionCategoryDto>>(transactionCategories);

            return categories;
        }

    }
}
