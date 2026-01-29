using Microsoft.EntityFrameworkCore;

namespace e_commercedsw.backend.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<OrderEntity> Orders => Set<OrderEntity>();
    public DbSet<OrderItemEntity> OrderItems => Set<OrderItemEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderEntity>()
            .OwnsOne(o => o.Address);

        modelBuilder.Entity<OrderItemEntity>()
            .HasOne(i => i.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(i => i.OrderId);

        base.OnModelCreating(modelBuilder);
    }
}