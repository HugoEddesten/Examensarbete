namespace Business.Models.Dtos.Workspace;

public class UpdateWorkspaceDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
}
