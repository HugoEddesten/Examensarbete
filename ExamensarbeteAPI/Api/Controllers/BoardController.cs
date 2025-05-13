using Business.Models.Dtos.Board;
using Infrastructure.Data;
using Infrastructure.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("[Controller]")]
public class BoardController : ControllerBase
{
    private readonly AppDbContext _context;

    public BoardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBoardDto model)
    {
        try
        {
            BoardEntity board = new()
            {
                Title = model.Title,
                WorkspaceId = model.WorkspaceId,
                PositionX = model.PositionX,
                PositionY = model.PositionY,
                Width = model.Width,
                Height = model.Height,
            };

            _context.Boards.Add(board);
            await _context.SaveChangesAsync();

            return Created();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("from-workspace/{workspaceId}")]
    public async Task<IActionResult> GetFromWorkspace(Guid workspaceId)
    {
        try
        {
            List<BoardEntity> boards = await _context.Boards.Where(b => b.WorkspaceId == workspaceId).ToListAsync();

            return Ok(boards);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    //[HttpGet("{id}")]
    //public async Task<IActionResult> Get([FromRoute] Guid id)
    //{
    //    try
    //    {
    //        BoardEntity? board = await _context.Boards.Where(b => b.Id == id).Select(b => new BoardEntity 
    //        {
    //            Id = b.Id,
    //            Title = b.Title,
    //            WorkspaceId = b.WorkspaceId,
    //            Activities = b.Activities.Select(a => new ActivityEntity
    //            {
    //                Id = a.Id,
    //                Title = a.Title,
    //                Description = a.Description,
    //                CreatedDate = a.CreatedDate,
    //                UpdatedDate = a.UpdatedDate,
    //            }).ToList(),
    //        }).FirstOrDefaultAsync();
    //        if (board == null)
    //        {
    //            return NotFound();
    //        }
    //        return Ok(board);
    //    }
    //    catch (Exception ex)
    //    {
    //        return BadRequest();
    //    }
    //}

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateBoardDto model)
    {
        try
        {
            BoardEntity? board = await _context.Boards.FirstOrDefaultAsync(b => b.Id == model.Id);
            if (board == null)
            {
                return NotFound();
            }
            board.Title = model.Title;
            board.PositionX = model.PositionX;
            board.PositionY = model.PositionY;
            board.Width = model.Width;
            board.Height = model.Height;

            await _context.SaveChangesAsync();
            return Ok(board);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        try
        {
            BoardEntity? board = await _context.Boards.FirstOrDefaultAsync(b => b.Id == id);
            if (board != null)
            {
                _context.Boards.Remove(board);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }
}
