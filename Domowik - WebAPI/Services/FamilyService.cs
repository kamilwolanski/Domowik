﻿using AutoMapper;
using Domowik___WebAPI.Authorization;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Exceptions;
using Domowik___WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Domowik___WebAPI.Services
{
    public interface IFamilyService
    {
        FamilyDto GetById(int id);
        IEnumerable<FamilyDto> GetAll();
        Task<int> Create(CreateFamilyDto createFamilyDto);
        void Delete();
        Task Update(int id, UpdateFamilyDto updateFamilyDto);
        void Add(AddUserToFamilyDto dto);
        void DeleteUser(int id);
    }

    public class FamilyService : IFamilyService
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<FamilyService> _logger;
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserContextService _userContextService;

        public FamilyService(DomowikDbContext dbContext, IMapper mapper, ILogger<FamilyService> logger, IAuthorizationService authorizationService, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _userContextService = userContextService;
        }

        public void DeleteUser(int id)
        {

            var userToDelete = _dbContext.Users.SingleOrDefault(u => u.Id == id);
            var userToDeleteFamily = _dbContext.Families
                 .Include(x => x.Members)
                 .SingleOrDefault(x => x.Members.Any(x => id == x.Id));


            userToDeleteFamily.Members.Remove(userToDelete);
            _dbContext.SaveChanges();
        }

        public async Task<int> CreateShoppingList(CreateShoppingListDto createShoppingListDto)
        {
            var userId = _userContextService.GetUserId;
            var userFamily = await _dbContext.Families.Include(f => f.Members).Include(f => f.ShoppingLists).FirstOrDefaultAsync(x => x.Members.Any(m => m.Id == userId));
            
            var shoppingList = _mapper.Map<ShoppingList>(createShoppingListDto);

            if (userFamily == null)
            {
                throw new NotFoundException("Family not Found");
            }

            userFamily.ShoppingLists.Add(shoppingList);
            await _dbContext.SaveChangesAsync();

            return shoppingList.Id;
        }


        public void Add(AddUserToFamilyDto dto)
        {
            var userId = _userContextService.GetUserId;
            var userFamily = _dbContext.Families.Include(f => f.Members).FirstOrDefault(f => f.HeadId == userId);

            var userToAdd = _dbContext.Users.FirstOrDefault(u => u.Email == dto.Email);

            if (userToAdd == null)
            {
                throw new NotFoundException("Nie odnaleziono użytkownika o podanym adresie email");
            }

            var userHasFamily = userToAdd.FamilyId != null;

            if (userHasFamily)
            {
                throw new InvalidOperationException("Użytkownik o podanym adresie email należy już do innej rodziny");
            }

            if (userFamily == null)
            {
                throw new NotFoundException("Family not Found");
            }

            userFamily.Members.Add(userToAdd);
            _dbContext.SaveChanges();
        }

        public async Task Update(int id, UpdateFamilyDto updateFamilyDto)
        {
            var family = _dbContext.Families.FirstOrDefault(f => f.Id == id);

            if (family == null)
            {
                throw new NotFoundException("Family not Found");
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(_userContextService.User, family, new ResourceOperationRequirement(ResourceOperation.Update));


            if(!authorizationResult.Succeeded)
            {
                throw new ForbidException();
            }

            family.Name = updateFamilyDto.Name;

            _dbContext.SaveChanges();

        }

        public void Delete()
        {
            var userId = _userContextService.GetUserId;
            var family = _dbContext.Families.FirstOrDefault(f => f.HeadId == userId);
            var headOfFamily = _dbContext.Users.FirstOrDefault(u => u.Id == userId);


            var usersToUpdate = _dbContext.Users.Where(u => u.FamilyId == family.Id).ToList();
            foreach (var user in usersToUpdate)
            {
                user.FamilyId = null; 
            }

            headOfFamily.RoleId = 1;

            _dbContext.Families.Remove(family);
            _dbContext.SaveChanges();

        }
        public FamilyDto GetById(int id)
        {
            var family = _dbContext.Families.Include(f => f.Members).Include(f => f.Head)
                .AsNoTracking()
                .FirstOrDefault(x => x.Id == id);

            if(family == null)
            {
                throw new NotFoundException("Family not Found");
            }

            var result = _mapper.Map<FamilyDto>(family);

            return result;
        }

        public IEnumerable<FamilyDto> GetAll()
        {
            var families = _dbContext.Families.Include(f => f.Members).ToList();

            var familiesDtos = _mapper.Map<List<FamilyDto>>(families);

            return familiesDtos;
        }

        public async Task<int> Create(CreateFamilyDto createFamilyDto)
        {
            var userId = _userContextService.GetUserId;
            if (!await HasFamily(userId))
            {
                throw new InvalidOperationException();
            }
            var family = _mapper.Map<Family>(createFamilyDto);
            family.HeadId = userId;
            _dbContext.Add(family);
            _dbContext.SaveChanges();

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == userId);
            user.RoleId = 3;
            user.FamilyId = family.Id;
            await _dbContext.SaveChangesAsync();

            return family.Id;
        }

        private async Task<bool> HasFamily(int userId)
        {
            var user = await _dbContext.Users.SingleAsync(x => x.Id == userId);
            return user.FamilyId is null;
        }

    }
}
