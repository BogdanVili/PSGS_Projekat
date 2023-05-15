using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Infrastructure.Configurations
{
    public class AdminConfiguration : IEntityTypeConfiguration<Administrator>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Administrator> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.FirstAndLastName).HasMaxLength(50);

            builder.Property(x => x.Address).HasMaxLength(50);
        }
    }
}
