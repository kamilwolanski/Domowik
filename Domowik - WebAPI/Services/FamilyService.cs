using AutoMapper;
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
        int Create(CreateFamilyDto createFamilyDto);
        void Delete(int id);
        void Update(int id, UpdateFamilyDto updateFamilyDto);
        void Add(AddUserToFamilyDto dto);
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

            userFamily.Members.Add(userToAdd);
            _dbContext.SaveChanges();
        }

        public void Update(int id, UpdateFamilyDto updateFamilyDto)
        {
            var family = _dbContext.Families.FirstOrDefault(f => f.Id == id);

            if (family == null)
            {
                throw new NotFoundException("Family not Found");
            }

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, family, new ResourceOperationRequirement(ResourceOperation.Update)).Result;


            if(!authorizationResult.Succeeded)
            {
                throw new ForbidException();
            }

            family.Name = updateFamilyDto.Name;

            _dbContext.SaveChanges();

        }

        public void Delete(int id)
        {
            
            var family = _dbContext.Families.FirstOrDefault(f => f.Id == id);

            if (family == null)
            {
                throw new NotFoundException("Family not Found");
            }

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, family, new ResourceOperationRequirement(ResourceOperation.Delete)).Result;


            _dbContext.Families.Remove(family);
            _dbContext.SaveChanges();

        }
        public FamilyDto GetById(int id)
        {
            var family = _dbContext.Families.Include(f => f.Members).Include(f => f.Head).FirstOrDefault(x => x.Id == id);

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

        public int Create(CreateFamilyDto createFamilyDto)
        {
            var family = _mapper.Map<Family>(createFamilyDto);
            var userId = _userContextService.GetUserId;
            var user = _dbContext.Users.FirstOrDefault(x => x.Id == userId);
            family.HeadId = userId;
            _dbContext.Families.Add(family);
            user.FamilyId = userId;
            user.RoleId = 3;
            _dbContext.SaveChanges();

            return family.Id;
        }
    }
}
