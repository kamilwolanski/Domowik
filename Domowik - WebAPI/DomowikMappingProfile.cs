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
            CreateMap<TransactionCategory, TransactionCategoryDto>();
            CreateMap<ShoppingList, ShoppingListDto>();
            CreateMap<ShoppingList, CreateShoppingListDto>();
            CreateMap<CreateShoppingListDto, ShoppingList>();
            CreateMap<ShoppingListProduct, ShoppingListProductDto>();
            CreateMap<ProductCategory, ProductCategoryDto>();
            CreateMap<Product, ProductDto>();
            CreateMap<CreateShoppingListProductDto, Product>().ReverseMap();
            CreateMap<ShoppingListProductDto, Product>().ReverseMap();
            CreateMap<Transaction, TransactionDto>().ReverseMap();
            CreateMap<UpdateShoppingListDto, ShoppingList>();
        }
    }
}
