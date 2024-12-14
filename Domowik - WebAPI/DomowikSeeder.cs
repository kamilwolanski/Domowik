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
            var miesoCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Mięso i ryby");
            var pieczywoCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Pieczywo i wypieki");
            var produktySucheCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Produkty suche i sypkie");
            var przetworyCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Przetwory i konserwy");
            var przekaskiCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Przekąski i słodycze");
            var przyprawyCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Przyprawy i dodatki");
            var mrozonkiCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Mrożonki");
            var czystoscCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Środki czystości");
            var higienaCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Higiena osobista");
            var artykulyPapieroweCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Artykuły papierowe");
            var artykulyDomoweCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Artykuły domowe");
            var ogrodCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Ogród i rośliny");
            var niemowlakiCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Produkty dla niemowląt");
            var zabawkiCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Zabawki i akcesoria dla dzieci");
            var karmaZwierzatCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Karma i przysmaki dla zwierząt");
            var akcesoriaZwierzatCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Akcesoria dla zwierząt");
            var baterieCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Baterie i akcesoria elektroniczne");
            var narzedziaCategory = _dbContext.ProductCategories.FirstOrDefault(pc => pc.Name == "Narzędzia i materiały eksploatacyjne");

            if (nabialCategory != null && owoceCategory != null && napojeCategory != null && miesoCategory != null && pieczywoCategory != null &&
                produktySucheCategory != null && przetworyCategory != null && przekaskiCategory != null && przyprawyCategory != null &&
                mrozonkiCategory != null && czystoscCategory != null && higienaCategory != null && artykulyPapieroweCategory != null &&
                artykulyDomoweCategory != null && ogrodCategory != null && niemowlakiCategory != null && zabawkiCategory != null &&
                karmaZwierzatCategory != null && akcesoriaZwierzatCategory != null && baterieCategory != null && narzedziaCategory != null)
            {
                var products = new List<Product>
            {
                new Product { Name = "Mleko", ProductCategoryId = nabialCategory.Id },
                new Product { Name = "Jabłka", ProductCategoryId = owoceCategory.Id },
                new Product { Name = "Sok pomarańczowy", ProductCategoryId = napojeCategory.Id },
                new Product { Name = "Kurczak", ProductCategoryId = miesoCategory.Id },
                new Product { Name = "Chleb pszenny", ProductCategoryId = pieczywoCategory.Id },
                new Product { Name = "Mąka pszenna", ProductCategoryId = produktySucheCategory.Id },
                new Product { Name = "Sos pomidorowy", ProductCategoryId = przetworyCategory.Id },
                new Product { Name = "Czekolada mleczna", ProductCategoryId = przekaskiCategory.Id },
                new Product { Name = "Sól", ProductCategoryId = przyprawyCategory.Id },
                new Product { Name = "Groszek mrożony", ProductCategoryId = mrozonkiCategory.Id },
                new Product { Name = "Płyn do mycia naczyń", ProductCategoryId = czystoscCategory.Id },
                new Product { Name = "Szampon do włosów", ProductCategoryId = higienaCategory.Id },
                new Product { Name = "Papier toaletowy", ProductCategoryId = higienaCategory.Id },
                new Product { Name = "Mop", ProductCategoryId = artykulyDomoweCategory.Id },
                new Product { Name = "Nasiona trawy", ProductCategoryId = ogrodCategory.Id },
                new Product { Name = "Pielucha jednorazowa", ProductCategoryId = niemowlakiCategory.Id },
                new Product { Name = "Klocki konstrukcyjne", ProductCategoryId = zabawkiCategory.Id },
                new Product { Name = "Karma dla psa", ProductCategoryId = karmaZwierzatCategory.Id },
                new Product { Name = "Smycz dla psa", ProductCategoryId = akcesoriaZwierzatCategory.Id },
                new Product { Name = "Bateria AA", ProductCategoryId = baterieCategory.Id },
                new Product { Name = "Wkrętarka", ProductCategoryId = narzedziaCategory.Id }
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
