using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Exceptions;
using Domowik___WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using static Domowik___WebAPI.Services.IUserContextService;

namespace Domowik___WebAPI.Services
{
    public interface IUserService
    {
        FamilyDto GetUserFamily();
        UserDto GetUser();
        void UpdateUser(UserUpdateDto dto);
        void DeleteUser();
    }
    public class UserService : IUserService
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public UserService(DomowikDbContext dbContext, IMapper mapper, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _userContextService = userContextService;
            _mapper = mapper;
        }

        public void DeleteUser()
        {
            var userId = _userContextService.GetUserId;
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);

            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
        }

        public UserDto GetUser()
        {
            var userId = _userContextService.GetUserId;

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                throw new NotFoundException("User not Found");
            }

            var result = _mapper.Map<UserDto>(user);

            return result;
        }

        public void UpdateUser(UserUpdateDto dto)
        {
            var userId = _userContextService.GetUserId;

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                throw new NotFoundException("User not Found");
            }

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.DateOfBirth = dto.DateOfBirth;

            _dbContext.SaveChanges();
        }
        public FamilyDto GetUserFamily()
        {
            var userId = _userContextService.GetUserId;

            var userFamily = _dbContext.Families
                .Include(x => x.Members)
                .SingleOrDefault(x => x.Members.Any(x => userId == x.Id));

            var result = _mapper.Map<FamilyDto>(userFamily);

            return result;
        }
    }
}
