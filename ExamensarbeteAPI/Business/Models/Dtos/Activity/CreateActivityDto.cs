namespace Business.Models.Dtos.Activity;

public class CreateActivityDto : DtoBase
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public Guid BoardId { get; set; }
}
