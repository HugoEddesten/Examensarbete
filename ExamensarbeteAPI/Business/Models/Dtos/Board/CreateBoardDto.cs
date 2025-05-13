namespace Business.Models.Dtos.Board
{
    public class CreateBoardDto : DtoBase
    {
        public string? Title { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
