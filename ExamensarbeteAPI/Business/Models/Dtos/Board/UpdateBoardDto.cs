namespace Business.Models.Dtos.Board;

public class UpdateBoardDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}
