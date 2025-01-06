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
        public DbSet<TransactionCategory> TransactionCategories { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }

        public DbSet<ShoppingListProduct> ShoppingListProducts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<Note> Notes { get; set; }

        public DbSet<CalendarEvent> CalendarEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();

            modelBuilder.Entity<Note>()
               .HasOne(u => u.User)
               .WithMany(f => f.Notes)
               .HasForeignKey(u => u.UserId);

            modelBuilder.Entity<Role>()
                .Property(u => u.Name)
                .IsRequired();

            modelBuilder.Entity<Family>()
                .Property(f => f.Name)
                .IsRequired()
                .HasMaxLength(25);

            modelBuilder.Entity<Family>()
                .HasOne(f => f.Head)
                .WithMany()
                .HasForeignKey(f => f.HeadId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Family)
                .WithMany(f => f.Members)
                .HasForeignKey(u => u.FamilyId);

            modelBuilder.Entity<Family>()
                .HasMany(f => f.ShoppingLists)
                .WithOne(sl => sl.Family)
                .HasForeignKey(sl => sl.FamilyId);

            modelBuilder.Entity<ShoppingListProduct>()
                .HasKey(sl => sl.Id);

            modelBuilder.Entity<ShoppingListProduct>()
                .HasOne(sl => sl.ShoppingList)
                .WithMany(s => s.ShoppingListProducts)
                .HasForeignKey(sl => sl.ShoppingListId);

            modelBuilder.Entity<ShoppingListProduct>()
                .HasOne(sl => sl.Product)
                .WithMany(p => p.ShoppingListProducts)
                .HasForeignKey(sl => sl.ProductId);

            modelBuilder.Entity<ProductCategory>()
                .HasIndex(c => c.Name)
                .IsUnique();

            modelBuilder.Entity<Invitation>()
                .HasOne(i => i.Family)
                .WithMany()
                .HasForeignKey(i => i.FamilyId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Invitation>()
                .HasOne(i => i.Sender)
                .WithMany()
                .HasForeignKey(i => i.SenderId)
                .OnDelete(DeleteBehavior.NoAction);





            //definicje pól kalendarza
            modelBuilder.Entity<CalendarEvent>()
                .Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<CalendarEvent>()
                .Property(e => e.Description)
                .IsRequired(false)
                .HasMaxLength(500);

            modelBuilder.Entity<CalendarEvent>()
                .Property(e => e.StartDateTime)
                .IsRequired();

            modelBuilder.Entity<CalendarEvent>()
                .Property(e => e.EndDateTime)
                .IsRequired();

            modelBuilder.Entity<CalendarEvent>()
                .HasOne(e => e.Organizer)
                .WithMany()
                .HasForeignKey(e => e.OrganizerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CalendarEvent>()
                .HasOne(e => e.Family)
                .WithMany(f => f.Events)
                .HasForeignKey(e => e.FamilyId)
                .OnDelete(DeleteBehavior.Restrict);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
