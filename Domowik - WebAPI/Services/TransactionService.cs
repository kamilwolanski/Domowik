using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Services
{
    public interface ITransationService
    {
        void AddTransation(AddTransactionDto transationDto);
        FinanceDto GetFinances();
        void DeleteTransaction(int transactionId);
    }

    public class TransactionService : ITransationService
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public TransactionService(DomowikDbContext dbContext, IMapper mapper, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userContextService = userContextService;
        }

        public void DeleteTransaction(int transactionId)
        {
            var transaction = _dbContext.Transactions.SingleOrDefault(t => t.Id == transactionId);
            _dbContext.Transactions.Remove(transaction);

            _dbContext.SaveChanges();
        }

        public void AddTransation(AddTransactionDto transationDto)
        {
            var userId = _userContextService.GetUserId;

            var userFamily = _dbContext.Families
                   .Include(x => x.Members)
                   .Include(x => x.Transactions)
                   .SingleOrDefault(x => x.Members.Any(x => userId == x.Id));

            var transation = new Transaction
            {
                FamilyId = userFamily.Id,
                UserId = userId,
                Name = transationDto.Name,
                Count = transationDto.Count,
                CreatedDate = DateTime.Now,
                CategoryId = transationDto.CategoryId,
            };

            userFamily.Transactions.Add(transation);

            _dbContext.SaveChanges(); 
        }

        public FinanceDto GetFinances()
        {
            var userId = _userContextService.GetUserId;
            var userFamilyId = _dbContext.Users
                .Where(x => x.Id == userId)
                .Select(x => x.FamilyId)
                .Single();
            var transactions = _dbContext.Transactions
                .Include(x => x.User)
                .Where(x => x.FamilyId == userFamilyId)
                .AsNoTracking()
                .ToList();

            return CreateFinanceContract(transactions);
        }

        private FinanceDto CreateFinanceContract(IEnumerable<Transaction> transactions)
        {
            var budget = transactions.Sum(t => t.Count);
            return new FinanceDto(budget, _mapper.Map<List<TransactionDto>>(transactions));
        }
    }

    public class FinanceDto
    {
        public FinanceDto(int budget, IEnumerable<TransactionDto> transactions)
        {
            Budget = budget;
            Transactions = transactions;
        }

        public int Budget { get; }
        public IEnumerable<TransactionDto> Transactions { get; }
    }
}
