using Domowik___WebAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Data
{
    public class DomowikDbContext : DbContext
    {
        private string _connectionString = "Data Source=DESKTOP-N8V5MQE\\SQLEXPRESS;Initial Catalog=DomowikDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";

        public DbSet<Family> Families { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();

            modelBuilder.Entity<Role>()
                .Property(u => u.Name)
                .IsRequired();

            modelBuilder.Entity<Family>()
                .Property(f => f.Name)
                .IsRequired()
                .HasMaxLength(25);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
