using Domowik___WebAPI.Data;
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
            if(_dbContext.Database.CanConnect())
            {
                if(!_dbContext.Roles.Any())
                {
                    var roles = GetRoles();

                    _dbContext.Roles.AddRange(roles);
                    _dbContext.SaveChanges();
                }

                if(!_dbContext.Families.Any())
                {
                    var families = GetFamilies();
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
        private IEnumerable<Family> GetFamilies()
        {
            var families = new List<Family>()
            {
                new Family()
                {
                    Name = "Wolańscy",
                    Members = new List<User>()
                    {
                        new User()
                        {
                            FirstName = "Kamil",
                            LastName = "Wolański",
                            DateOfBirth = new DateTime(1998, 4, 23),
                            Email = "kwolanski3@gmail.com",
                            PasswordHash = "123",
                            Role = GetRoles().FirstOrDefault(r => r.Name == "User")
                        }
                    }
                }
            };

            return families;
        }
    }
}
