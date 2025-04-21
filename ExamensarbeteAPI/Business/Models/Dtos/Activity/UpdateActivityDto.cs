namespace Business.Models.Dtos.Activity;

public class UpdateActivityDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public Guid BoardId { get; set; }
}