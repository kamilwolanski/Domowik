﻿using Domowik___WebAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Data
{
    public class DomowikDbContext : DbContext
    {

        private string _connectionString = "Data Source=PC\\SQLEXPRESS;Initial Catalog=DomowikDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";

        public DbSet<Family> Families { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<TransactionCategory> TransactionCategories { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }

        public DbSet<ShoppingListProduct> ShoppingListProducts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

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

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
