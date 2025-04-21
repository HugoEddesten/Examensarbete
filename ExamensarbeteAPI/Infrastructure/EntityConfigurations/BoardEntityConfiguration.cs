using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class BoardEntityConfiguration : IEntityTypeConfiguration<BoardEntity>
{
    public void Configure(EntityTypeBuilder<BoardEntity> builder)
    {
        builder.HasKey(b => b.Id);
    }
}