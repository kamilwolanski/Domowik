using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Microsoft.AspNetCore.Identity;

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

            SeedProductCategoriesAndProducts();

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

    private void SeedProductCategoriesAndProducts()
    {
        // Seedowanie kategorii produktów
        if (!_dbContext.ProductCategories.Any())
        {
            var categories = new List<ProductCategory>
            {
                new ProductCategory { Name = "Owoce i warzywa" },
                new ProductCategory { Name = "Mięso i ryby" },
                new ProductCategory { Name = "Nabiał i jajka" },
                new ProductCategory { Name = "Pieczywo i wypieki" },
                new ProductCategory { Name = "Produkty suche i sypkie" },
                new ProductCategory { Name = "Przetwory i konserwy" },
                new ProductCategory { Name = "Napoje" },
                new ProductCategory { Name = "Przekąski i słodycze" },
                new ProductCategory { Name = "Przyprawy i dodatki" },
                new ProductCategory { Name = "Mrożonki" },
                new ProductCategory { Name = "Środki czystości" },
                new ProductCategory { Name = "Higiena osobista" },
                new ProductCategory { Name = "Artykuły papierowe" },
                new ProductCategory { Name = "Artykuły domowe" },
                new ProductCategory { Name = "Ogród i rośliny" },
                new ProductCategory { Name = "Produkty dla niemowląt" },
                new ProductCategory { Name = "Zabawki i akcesoria dla dzieci" },
                new ProductCategory { Name = "Karma i przysmaki dla zwierząt" },
                new ProductCategory { Name = "Akcesoria dla zwierząt" },
                new ProductCategory { Name = "Baterie i akcesoria elektroniczne" },
                new ProductCategory { Name = "Narzędzia i materiały eksploatacyjne" }
            };

            _dbContext.ProductCategories.AddRange(categories);
            _dbContext.SaveChanges();
        }

        // Seedowanie produktów
        if (!_dbContext.Products.Any())
        {
            var nabialCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Nabiał i jajka");
            var owoceCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Owoce i warzywa");
            var napojeCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Napoje");

            if (nabialCategory != null && owoceCategory != null && napojeCategory != null)
            {
                var products = new List<Product>
                {
                    new Product { Name = "Mleko", ProductCategoryId = nabialCategory.Id },
                    new Product { Name = "Jabłka", ProductCategoryId = owoceCategory.Id },
                    new Product { Name = "Sok pomarańczowy", ProductCategoryId = napojeCategory.Id }
                };

                _dbContext.Products.AddRange(products);
                _dbContext.SaveChanges();
            }
        }
    }

    private IEnumerable<Role> GetRoles()
    {
        var roles = new List<Role>
        {
            new Role { Name = "User" },
            new Role { Name = "FamilyMember" },
            new Role { Name = "FamilyHead" }
        };

        return roles;
    }

    private IEnumerable<TransactionCategory> GetTransactionCategories()
    {
        var categories = new List<TransactionCategory>
        {
            new TransactionCategory { Name = "Rachunki", Type = TransactionCategoryType.Expense },
            new TransactionCategory { Name = "Zdrowie", Type = TransactionCategoryType.Expense },
            new TransactionCategory { Name = "Zakupy", Type = TransactionCategoryType.Expense },
            new TransactionCategory { Name = "Pensja", Type = TransactionCategoryType.Income },
            new TransactionCategory { Name = "Sprzedaż", Type = TransactionCategoryType.Income },
            new TransactionCategory { Name = "Inwestycje", Type = TransactionCategoryType.Income }
        };

        return categories;
    }

    private IEnumerable<Family> GetFamilies(User user)
    {
        // Sprawdzamy, czy kategoria "Nabiał i jajka" już istnieje
        var nabialCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Nabiał i jajka");
        var napojeCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Napoje");
        if (nabialCategory == null)
        {
            nabialCategory = new ProductCategory { Name = "Nabiał i jajka" };
            _dbContext.ProductCategories.Add(nabialCategory);
            _dbContext.SaveChanges();
        }

        if (napojeCategory == null)
        {
            napojeCategory = new ProductCategory { Name = "Napoje" };
            _dbContext.ProductCategories.Add(napojeCategory);
            _dbContext.SaveChanges();
        }

        // Sprawdzamy, czy produkt "Mleko" już istnieje, aby uniknąć duplikacji
        var mlekoProduct = _dbContext.Products.FirstOrDefault(p => p.Name == "Mleko" && p.ProductCategoryId == nabialCategory.Id);
        if (mlekoProduct == null)
        {
            mlekoProduct = new Product
            {
                Name = "Mleko",
                ProductCategoryId = nabialCategory.Id
            };
            _dbContext.Products.Add(mlekoProduct);
            _dbContext.SaveChanges();
        }

        var sokProduct = _dbContext.Products.FirstOrDefault(p => p.Name == "Sok pomarańczowy");
        if (sokProduct == null)
        {
            sokProduct = new Product
            {
                Name = "Sok pomarańczowy",
                ProductCategoryId = napojeCategory.Id
            };
            _dbContext.Products.Add(sokProduct);
            _dbContext.SaveChanges();
        }

        var families = new List<Family>
    {
        new Family
        {
            Name = "Wolańscy",
            HeadId = user.Id,
            Members = new List<User> { user },
            ShoppingLists = new List<ShoppingList>
            {
                new ShoppingList
                {
                    Name = "Biedronka",
                    ShoppingListProducts = new List<ShoppingListProduct>
                    {
                        new ShoppingListProduct
                        {
                            
                            Product = mlekoProduct
                           
                        },
                        new ShoppingListProduct
                        {
                            Product = sokProduct
                        }
                    }
                }
            }
        }
    };

        return families;
    }

}
