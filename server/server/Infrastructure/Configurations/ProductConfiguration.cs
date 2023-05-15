using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server.Models;

namespace server.Infrastructure.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Name).HasMaxLength(30);

            builder.Property(x => x.Description).HasMaxLength(512);

            builder.Property(x => x.SellerId).IsRequired();

            builder.HasOne(x => x.Seller)
                   .WithMany(x => x.Products)
                   .HasForeignKey(x => x.SellerId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
