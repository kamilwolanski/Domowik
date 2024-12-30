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
            SeedCalendarEvents();
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
            var categories = _dbContext.ProductCategories.ToDictionary(pc => pc.Name, pc => pc.Id);

            var products = new List<Product>
        {
            // Owoce i warzywa
            new Product { Name = "Jabłka", ProductCategoryId = categories["Owoce i warzywa"] },
            new Product { Name = "Pomarańcze", ProductCategoryId = categories["Owoce i warzywa"] },
            new Product { Name = "Ziemniaki", ProductCategoryId = categories["Owoce i warzywa"] },
            new Product { Name = "Marchew", ProductCategoryId = categories["Owoce i warzywa"] },
            new Product { Name = "Sałata", ProductCategoryId = categories["Owoce i warzywa"] },

            // Mięso i ryby
            new Product { Name = "Kurczak", ProductCategoryId = categories["Mięso i ryby"] },
            new Product { Name = "Wołowina", ProductCategoryId = categories["Mięso i ryby"] },
            new Product { Name = "Łosoś", ProductCategoryId = categories["Mięso i ryby"] },
            new Product { Name = "Tuńczyk", ProductCategoryId = categories["Mięso i ryby"] },
            new Product { Name = "Wieprzowina", ProductCategoryId = categories["Mięso i ryby"] },

            // Nabiał i jajka
            new Product { Name = "Mleko", ProductCategoryId = categories["Nabiał i jajka"] },
            new Product { Name = "Ser żółty", ProductCategoryId = categories["Nabiał i jajka"] },
            new Product { Name = "Masło", ProductCategoryId = categories["Nabiał i jajka"] },
            new Product { Name = "Jogurt naturalny", ProductCategoryId = categories["Nabiał i jajka"] },
            new Product { Name = "Jajka", ProductCategoryId = categories["Nabiał i jajka"] },

            // Pieczywo i wypieki
            new Product { Name = "Chleb pszenny", ProductCategoryId = categories["Pieczywo i wypieki"] },
            new Product { Name = "Bułki", ProductCategoryId = categories["Pieczywo i wypieki"] },
            new Product { Name = "Croissanty", ProductCategoryId = categories["Pieczywo i wypieki"] },
            new Product { Name = "Ciasto drożdżowe", ProductCategoryId = categories["Pieczywo i wypieki"] },
            new Product { Name = "Ciastka owsiane", ProductCategoryId = categories["Pieczywo i wypieki"] },

            // Produkty suche i sypkie
            new Product { Name = "Mąka pszenna", ProductCategoryId = categories["Produkty suche i sypkie"] },
            new Product { Name = "Cukier", ProductCategoryId = categories["Produkty suche i sypkie"] },
            new Product { Name = "Ryż", ProductCategoryId = categories["Produkty suche i sypkie"] },
            new Product { Name = "Makaron", ProductCategoryId = categories["Produkty suche i sypkie"] },
            new Product { Name = "Kasza gryczana", ProductCategoryId = categories["Produkty suche i sypkie"] },

            // Przetwory i konserwy
            new Product { Name = "Sos pomidorowy", ProductCategoryId = categories["Przetwory i konserwy"] },
            new Product { Name = "Ogórki konserwowe", ProductCategoryId = categories["Przetwory i konserwy"] },
            new Product { Name = "Dżem truskawkowy", ProductCategoryId = categories["Przetwory i konserwy"] },
            new Product { Name = "Puszka kukurydzy", ProductCategoryId = categories["Przetwory i konserwy"] },
            new Product { Name = "Pasztet", ProductCategoryId = categories["Przetwory i konserwy"] },

            // Napoje
            new Product { Name = "Sok pomarańczowy", ProductCategoryId = categories["Napoje"] },
            new Product { Name = "Woda gazowana", ProductCategoryId = categories["Napoje"] },
            new Product { Name = "Herbata czarna", ProductCategoryId = categories["Napoje"] },
            new Product { Name = "Kawa rozpuszczalna", ProductCategoryId = categories["Napoje"] },
            new Product { Name = "Napój energetyczny", ProductCategoryId = categories["Napoje"] },

            // Przekąski i słodycze
            new Product { Name = "Czekolada mleczna", ProductCategoryId = categories["Przekąski i słodycze"] },
            new Product { Name = "Chipsy ziemniaczane", ProductCategoryId = categories["Przekąski i słodycze"] },
            new Product { Name = "Ciastka kruche", ProductCategoryId = categories["Przekąski i słodycze"] },
            new Product { Name = "Orzeszki solone", ProductCategoryId = categories["Przekąski i słodycze"] },
            new Product { Name = "Lizaki", ProductCategoryId = categories["Przekąski i słodycze"] },

            // Przyprawy i dodatki
            new Product { Name = "Sól", ProductCategoryId = categories["Przyprawy i dodatki"] },
            new Product { Name = "Pieprz czarny", ProductCategoryId = categories["Przyprawy i dodatki"] },
            new Product { Name = "Papryka słodka", ProductCategoryId = categories["Przyprawy i dodatki"] },
            new Product { Name = "Bazylia", ProductCategoryId = categories["Przyprawy i dodatki"] },
            new Product { Name = "Cukier waniliowy", ProductCategoryId = categories["Przyprawy i dodatki"] },

            // Mrożonki
            new Product { Name = "Groszek mrożony", ProductCategoryId = categories["Mrożonki"] },
            new Product { Name = "Pizza mrożona", ProductCategoryId = categories["Mrożonki"] },
            new Product { Name = "Lody waniliowe", ProductCategoryId = categories["Mrożonki"] },
            new Product { Name = "Pierogi mrożone", ProductCategoryId = categories["Mrożonki"] },
            new Product { Name = "Szpinak mrożony", ProductCategoryId = categories["Mrożonki"] },

            // Środki czystości
            new Product { Name = "Płyn do mycia naczyń", ProductCategoryId = categories["Środki czystości"] },
            new Product { Name = "Proszek do prania", ProductCategoryId = categories["Środki czystości"] },
            new Product { Name = "Ściereczki nawilżane", ProductCategoryId = categories["Środki czystości"] },
            new Product { Name = "Mleczko do czyszczenia", ProductCategoryId = categories["Środki czystości"] },
            new Product { Name = "Odkamieniacz", ProductCategoryId = categories["Środki czystości"] },

            // Higiena osobista
            new Product { Name = "Szampon do włosów", ProductCategoryId = categories["Higiena osobista"] },
            new Product { Name = "Mydło w płynie", ProductCategoryId = categories["Higiena osobista"] },
            new Product { Name = "Dezodorant", ProductCategoryId = categories["Higiena osobista"] },
            new Product { Name = "Pasta do zębów", ProductCategoryId = categories["Higiena osobista"] },
            new Product { Name = "Płyn do płukania jamy ustnej", ProductCategoryId = categories["Higiena osobista"] },

            // Artykuły papierowe
            new Product { Name = "Papier toaletowy", ProductCategoryId = categories["Artykuły papierowe"] },
            new Product { Name = "Ręczniki papierowe", ProductCategoryId = categories["Artykuły papierowe"] },
            new Product { Name = "Chusteczki higieniczne", ProductCategoryId = categories["Artykuły papierowe"] },
            new Product { Name = "Serwetki", ProductCategoryId = categories["Artykuły papierowe"] },
            new Product { Name = "Papier do pieczenia", ProductCategoryId = categories["Artykuły papierowe"] },

            // Artykuły domowe
            new Product { Name = "Mop", ProductCategoryId = categories["Artykuły domowe"] },
            new Product { Name = "Zmiotka i szufelka", ProductCategoryId = categories["Artykuły domowe"] },
            new Product { Name = "Gąbki do mycia naczyń", ProductCategoryId = categories["Artykuły domowe"] },
            new Product { Name = "Worki na śmieci", ProductCategoryId = categories["Artykuły domowe"] },
            new Product { Name = "Świeczki zapachowe", ProductCategoryId = categories["Artykuły domowe"] },

            // Ogród i rośliny
            new Product { Name = "Nasiona trawy", ProductCategoryId = categories["Ogród i rośliny"] },
            new Product { Name = "Konewka", ProductCategoryId = categories["Ogród i rośliny"] },
            new Product { Name = "Ziemia ogrodowa", ProductCategoryId = categories["Ogród i rośliny"] },
            new Product { Name = "Kwiaty doniczkowe", ProductCategoryId = categories["Ogród i rośliny"] },
            new Product { Name = "Nożyce ogrodowe", ProductCategoryId = categories["Ogród i rośliny"] },

            // Produkty dla niemowląt
            new Product { Name = "Pielucha jednorazowa", ProductCategoryId = categories["Produkty dla niemowląt"] },
            new Product { Name = "Mleko modyfikowane", ProductCategoryId = categories["Produkty dla niemowląt"] },
            new Product { Name = "Chusteczki nawilżane", ProductCategoryId = categories["Produkty dla niemowląt"] },
            new Product { Name = "Butelka do karmienia", ProductCategoryId = categories["Produkty dla niemowląt"] },
            new Product { Name = "Smoczek", ProductCategoryId = categories["Produkty dla niemowląt"] },

            // Zabawki i akcesoria dla dzieci
            new Product { Name = "Klocki konstrukcyjne", ProductCategoryId = categories["Zabawki i akcesoria dla dzieci"] },
            new Product { Name = "Lalka", ProductCategoryId = categories["Zabawki i akcesoria dla dzieci"] },
            new Product { Name = "Samochodzik", ProductCategoryId = categories["Zabawki i akcesoria dla dzieci"] },
            new Product { Name = "Puzzle", ProductCategoryId = categories["Zabawki i akcesoria dla dzieci"] },
            new Product { Name = "Farby plakatowe", ProductCategoryId = categories["Zabawki i akcesoria dla dzieci"] },

            // Karma i przysmaki dla zwierząt
            new Product { Name = "Karma dla psa", ProductCategoryId = categories["Karma i przysmaki dla zwierząt"] },
            new Product { Name = "Karma dla kota", ProductCategoryId = categories["Karma i przysmaki dla zwierząt"] },
            new Product { Name = "Kości do gryzienia", ProductCategoryId = categories["Karma i przysmaki dla zwierząt"] },
            new Product { Name = "Przysmaki dla gryzoni", ProductCategoryId = categories["Karma i przysmaki dla zwierząt"] },
            new Product { Name = "Suchary dla ptaków", ProductCategoryId = categories["Karma i przysmaki dla zwierząt"] },

            // Akcesoria dla zwierząt
            new Product { Name = "Smycz dla psa", ProductCategoryId = categories["Akcesoria dla zwierząt"] },
            new Product { Name = "Obroża dla kota", ProductCategoryId = categories["Akcesoria dla zwierząt"] },
            new Product { Name = "Klatka dla ptaków", ProductCategoryId = categories["Akcesoria dla zwierząt"] },
            new Product { Name = "Miski na jedzenie", ProductCategoryId = categories["Akcesoria dla zwierząt"] },
            new Product { Name = "Legowisko", ProductCategoryId = categories["Akcesoria dla zwierząt"] },

            // Baterie i akcesoria elektroniczne
            new Product { Name = "Bateria AA", ProductCategoryId = categories["Baterie i akcesoria elektroniczne"] },
            new Product { Name = "Bateria AAA", ProductCategoryId = categories["Baterie i akcesoria elektroniczne"] },
            new Product { Name = "Kabel USB", ProductCategoryId = categories["Baterie i akcesoria elektroniczne"] },
            new Product { Name = "Powerbank", ProductCategoryId = categories["Baterie i akcesoria elektroniczne"] },
            new Product { Name = "Ładowarka sieciowa", ProductCategoryId = categories["Baterie i akcesoria elektroniczne"] },

            // Narzędzia i materiały eksploatacyjne
            new Product { Name = "Wkrętarka", ProductCategoryId = categories["Narzędzia i materiały eksploatacyjne"] },
            new Product { Name = "Młotek", ProductCategoryId = categories["Narzędzia i materiały eksploatacyjne"] },
            new Product { Name = "Klucze nasadowe", ProductCategoryId = categories["Narzędzia i materiały eksploatacyjne"] },
            new Product { Name = "Taśma izolacyjna", ProductCategoryId = categories["Narzędzia i materiały eksploatacyjne"] },
            new Product { Name = "Wiertła do metalu", ProductCategoryId = categories["Narzędzia i materiały eksploatacyjne"] }
        };

            _dbContext.Products.AddRange(products);
            _dbContext.SaveChanges();
        }
    }
    private void SeedCalendarEvents()
    {
        if (!_dbContext.CalendarEvents.Any())
        {
            var families = _dbContext.Families.ToList();
            var users = _dbContext.Users.ToList();

            var calendarEvents = new List<CalendarEvent>
        {
            new CalendarEvent
            {
                Name = "Wakacje",
                Description = "Relaks na plaży",
                StartDateTime = new DateTime(2024, 8, 15, 9, 0, 0),
                EndDateTime = new DateTime(2024, 8, 15, 18, 0, 0),
                FamilyId = null,
                OrganizerId = users[0].Id
            },
            new CalendarEvent
            {
                Name = "Rodzinny obiad",
                Description = "Spotkanie z dziadkami",
                StartDateTime = new DateTime(2024, 8, 16, 9, 0, 0),
                EndDateTime = new DateTime(2024, 8, 16, 18, 0, 0),
                FamilyId = null,
                OrganizerId = users[0].Id
            },
            new CalendarEvent
            {
                Name = "Wycieczka do parku",
                Description = "Spływ kajakami",
                StartDateTime = new DateTime(2024, 8, 17, 9, 0, 0),
                EndDateTime = new DateTime(2024, 8, 17, 18, 0, 0),
                FamilyId = null,
                OrganizerId = users[0].Id
            }
        };

            _dbContext.CalendarEvents.AddRange(calendarEvents);
            _dbContext.SaveChanges();
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
