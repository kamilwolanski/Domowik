﻿using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI
{
    public class DomowikSeeder
    {
        private readonly DomowikDbContext _dbContext;

        public DomowikSeeder(DomowikDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.Roles.Any())
                {
                    var roles = GetRoles();

                    _dbContext.Roles.AddRange(roles);
                    _dbContext.SaveChanges();
                }

                if (!_dbContext.TransactionCategories.Any())
                {
                    var transicionCategories = GetTransactionCategories();

                    _dbContext.TransactionCategories.AddRange(transicionCategories);
                    _dbContext.SaveChanges();
                }

                if (!_dbContext.Families.Any())
                {
                    var user = new User()
                    {
                        FirstName = "Kamil",
                        LastName = "Wolański",
                        DateOfBirth = new DateTime(1998, 4, 23),
                        Email = "kwolanski3@gmail.com",
                        PasswordHash = "123",
                        RoleId = 3
                    };

                    _dbContext.Users.Add(user);
                    _dbContext.SaveChanges();

                    var families = GetFamilies(user);

                    _dbContext.Families.AddRange(families);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
        {
            new Role()
            {
                Name = "User",
            },
            new Role()
            {
                Name = "FamilyMember"
            },
            new Role()
            {
                Name = "FamilyHead"
            }
        };

            return roles;
        }

        private IEnumerable<TransactionCategory> GetTransactionCategories()
        {
            var categories = new List<TransactionCategory>()
            {
                new TransactionCategory()
                {
                    Name = "Rachunki",
                    Type = TransactionCategoryType.Expense
                },
                new TransactionCategory()
                {
                    Name = "Zdrowie",
                    Type = TransactionCategoryType.Expense
                },
                new TransactionCategory()
                {
                    Name = "Zakupy",
                    Type = TransactionCategoryType.Expense
                },
                new TransactionCategory()
                {
                    Name = "Pensja",
                    Type = TransactionCategoryType.Income
                },
                new TransactionCategory()
                {
                    Name = "Sprzedaż",
                    Type = TransactionCategoryType.Income
                },
                new TransactionCategory()
                {
                    Name = "Inwestycje",
                    Type = TransactionCategoryType.Income
                }
            };

            return categories;
        }

        private IEnumerable<Family> GetFamilies(User user)
        {
            var families = new List<Family>()
        {
            new Family()
            {
                Name = "Wolańscy",
                HeadId = user.Id,
                Members = new List<User>()
                {
                    user
                },
                ShoppingList = new ShoppingList()
                {
                    Products = new List<Product>()
                    {
                        new Product()
                        {
                            Name = "Cytryna",
                            Count = 2
                        }
                    }
                }
                
                    
            }
        };

            return families;
        }
    }

}
