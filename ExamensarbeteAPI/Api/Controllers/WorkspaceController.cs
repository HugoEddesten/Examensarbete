using Business.Models.Dtos.Workspace;
using Infrastructure.Data;
using Infrastructure.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("[Controller]")]
public class WorkspaceController : ControllerBase
{
    private readonly AppDbContext _context;

    public WorkspaceController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateWorkspaceDto model)
    {
        try
        {
            WorkspaceEntity workspace = new()
            {
                Title = model.Title,
            };

            _context.Workspaces.Add(workspace);
            await _context.SaveChangesAsync();

            return Created();
        }
        catch(Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            List<WorkspaceEntity> workspaces = await _context.Workspaces.ToListAsync();

            return Ok(workspaces);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        try
        {
            WorkspaceEntity? workspace = await _context.Workspaces.FirstOrDefaultAsync(w => w.Id == id);
            if (workspace == null)
            {
                return NotFound();
            }
            return Ok(workspace);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateWorkspaceDto model)
    {
        try
        {
            WorkspaceEntity? workspace = await _context.Workspaces.FirstOrDefaultAsync(w => w.Id == model.Id);
            if (workspace == null)
            {
                return NotFound();
            }
            workspace.Title = model.Title;

            await _context.SaveChangesAsync();
            return Ok(workspace);
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
            WorkspaceEntity? workspace = await _context.Workspaces.FirstOrDefaultAsync(w => w.Id == id);
            if (workspace != null) 
            {
                _context.Workspaces.Remove(workspace);
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
