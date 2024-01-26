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
        int Create(CreateFamilyDto createFamilyDto);
        void Delete(int id);
        void Update(int id, UpdateFamilyDto updateFamilyDto);
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

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, family, new ResourceOperationRequirement(ResourceOperation.Update)).Result;


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
            family.HeadId = _userContextService.GetUserId;
            _dbContext.Families.Add(family);
            _dbContext.SaveChanges();

            return family.Id;
        }
    }
}