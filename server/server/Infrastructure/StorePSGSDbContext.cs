using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Infrastructure
{
    public class StorePSGSDbContext : DbContext
    {
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<Buyer> Buyers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Seller> Sellers { get; set; }

        public StorePSGSDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(StorePSGSDbContext).Assembly);
        }
    }
}
