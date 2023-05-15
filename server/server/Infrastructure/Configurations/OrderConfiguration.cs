using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server.Models;

namespace server.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasMany(x => x.Products)
                   .WithMany(x => x.Orders);

            builder.Property(x => x.BuyerId).IsRequired();

            builder.HasOne(x => x.Buyer)
                   .WithMany(x => x.Orders)
                   .HasForeignKey(x => x.BuyerId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
