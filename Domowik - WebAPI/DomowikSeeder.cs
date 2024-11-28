using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace Domowik___WebAPI
{
    public class DomowikSeeder
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IPasswordHasher<User> _passwordHasher;

        public DomowikSeeder(DomowikDbContext dbContext, IPasswordHasher<User> passwordHasher)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
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
                    var transactionCategories = GetTransactionCategories();
                    _dbContext.TransactionCategories.AddRange(transactionCategories);
                    _dbContext.SaveChanges();
                }


                if (!_dbContext.Users.Any(u => u.Email == "kwolanski3@gmail.com"))
                {
                    var familyHeadRole = _dbContext.Roles.FirstOrDefault(r => r.Name == "FamilyHead");
                    if (familyHeadRole != null)
                    {
                        var user = new User()
                        {
                            FirstName = "Kamil",
                            LastName = "Wolański",
                            DateOfBirth = new DateTime(1998, 4, 23),
                            Email = "kwolanski3@gmail.com",
                            RoleId = familyHeadRole.Id
                        };
                        var hashedPassword = _passwordHasher.HashPassword(user, "Kurczak1234!");
                        user.PasswordHash = hashedPassword;

                        _dbContext.Users.Add(user);
                        _dbContext.SaveChanges();

                        var families = GetFamilies(user);
                        _dbContext.Families.AddRange(families);
                        _dbContext.SaveChanges();
                    }
                }
            }
        }

        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role() { Name = "User" },
                new Role() { Name = "FamilyMember" },
                new Role() { Name = "FamilyHead" }
            };

            return roles;
        }

        private IEnumerable<TransactionCategory> GetTransactionCategories()
        {
            var categories = new List<TransactionCategory>()
            {
                new TransactionCategory() { Name = "Rachunki", Type = TransactionCategoryType.Expense },
                new TransactionCategory() { Name = "Zdrowie", Type = TransactionCategoryType.Expense },
                new TransactionCategory() { Name = "Zakupy", Type = TransactionCategoryType.Expense },
                new TransactionCategory() { Name = "Pensja", Type = TransactionCategoryType.Income },
                new TransactionCategory() { Name = "Sprzedaż", Type = TransactionCategoryType.Income },
                new TransactionCategory() { Name = "Inwestycje", Type = TransactionCategoryType.Income }
            };

            return categories;
        }

        private IEnumerable<Family> GetFamilies(User user)
        {
            // Sprawdzamy, czy kategoria produktów "Nabiał" już istnieje
            var nabial = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Nabiał");
            if (nabial == null)
            {
                nabial = new ProductCategory { Name = "Nabiał" };
                _dbContext.ProductCategories.Add(nabial);
                _dbContext.SaveChanges();
            }

            var families = new List<Family>()
            {
                new Family()
                {
                    Name = "Wolańscy",
                    HeadId = user.Id,
                    Members = new List<User> { user },
                    ShoppingLists = new List<ShoppingList>
                    {
                        new ShoppingList()
                        {
                            Name = "Biedronka",
                            ShoppingListProducts = new List<ShoppingListProduct>
                            {
                                new ShoppingListProduct()
                                {
                                    Product = new Product()
                                    {
                                        Name = "Mleko",
                                        ProductCategory = nabial
                                    }
                                }
                            }
                        }
                    }
                }
            };

            return families;
        }
    }
}
