using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Entities;

public class WorkspaceEntity
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Title { get; set; } = null!;

    // Navigation Properties
    public ICollection<BoardEntity> Boards { get; set; } = [];
}
