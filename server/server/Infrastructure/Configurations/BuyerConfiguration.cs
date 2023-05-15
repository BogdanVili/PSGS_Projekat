using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server.Models;

namespace server.Infrastructure.Configurations
{
    public class BuyerConfiguration : IEntityTypeConfiguration<Buyer>
    {
        public void Configure(EntityTypeBuilder<Buyer> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.FirstAndLastName).HasMaxLength(50);

            builder.Property(x => x.Address).HasMaxLength(50);
        }
    }
}
