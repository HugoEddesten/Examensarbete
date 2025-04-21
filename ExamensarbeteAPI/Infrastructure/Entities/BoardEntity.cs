using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Entities;

public class BoardEntity
{
    [Key]
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    // Foreign Keys
    public Guid WorkspaceId { get; set; }

    // Navigation Properties
    public WorkspaceEntity? Workspace { get; set; }
    public ICollection<ActivityEntity> Activities { get; set; } = [];
}
