using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server.Models;

namespace server.Infrastructure.Configurations
{
    public class OrderProductAmountConfiguration : IEntityTypeConfiguration<OrderProductAmount>
    {
        public void Configure(EntityTypeBuilder<OrderProductAmount> builder)
        {
            builder.HasKey(x => new { x.OrderId, x.ProductId});

            builder.HasOne(x => x.Order)
                   .WithMany(x => x.OrderProductAmounts)
                   .HasForeignKey(x => x.OrderId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Product)
                   .WithMany(x => x.OrderProductAmounts)
                   .HasForeignKey(x => x.ProductId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
