using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Entities;

public class ActivityEntity
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    public DateTime? UpdatedDate { get; set; }

    // Foreign Keys
    public Guid BoardId { get; set; }

    // Navigation Properties
    public BoardEntity? Board { get; set; }
}
