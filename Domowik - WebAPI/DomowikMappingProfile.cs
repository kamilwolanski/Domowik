using AutoMapper;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Models;

namespace Domowik___WebAPI
{
    public class DomowikMappingProfile : Profile
    {
        public DomowikMappingProfile()
        {
            CreateMap<Family, FamilyDto>();
            CreateMap<User, FamilyUserDto>();
            CreateMap<CreateFamilyDto, Family>();
            CreateMap<User, UserDto>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<CreateShoppingListProductDto, Product>().ReverseMap();
            CreateMap<ShoppingListProductDto, Product>().ReverseMap();
            CreateMap<Transaction, TransactionDto>().ReverseMap();
        }
    }
}
