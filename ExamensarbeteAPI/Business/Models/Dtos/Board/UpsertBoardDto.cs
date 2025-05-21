namespace Business.Models.Dtos.Board;

public class UpsertBoardDto
{
    public string Id { get; set; }
    public Guid WorkspaceId { get; set; }
    public string Title { get; set; } = null!;
    public int PositionX { get; set; }
}
