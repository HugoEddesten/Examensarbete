using Business.Models.Dtos.Activity;
using Infrastructure.Data;
using Infrastructure.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("[Controller]")]
public class ActivityController : ControllerBase
{
    private readonly AppDbContext _context;

    public ActivityController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateActivityDto model)
    {
        try
        {
            ActivityEntity activity = new()
            {
                Title = model.Title,
                BoardId = model.BoardId,
                Description = model.Description,
            };

            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return Created();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("from-board/{boardId}")]
    public async Task<IActionResult> GetFromBoard(Guid boardId)
    {
        try
        {
            List<ActivityEntity> activities = await _context.Activities.Where(a => a.BoardId == boardId).ToListAsync();

            return Ok(activities);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("{activityId}")]
    public async Task<IActionResult> GetActivity([FromRoute] Guid activityId)
    {
        ActivityEntity? activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == activityId);

        if (activity != null)
        {
            return Ok(activity);
        }
        return NotFound();
    }

    //[HttpGet("{id}")]
    //public async Task<IActionResult> Get([FromRoute] Guid id)
    //{
    //    try
    //    {
    //        ActivityEntity? activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == id);
    //        if (activity == null)
    //        {
    //            return NotFound();
    //        }
    //        return Ok(activity);
    //    }
    //    catch (Exception ex)
    //    {
    //        return BadRequest();
    //    }
    //}

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateActivityDto model)
    {
        try
        {
            ActivityEntity? activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == model.Id);
            if (activity == null)
            {
                return NotFound();
            }
            activity.Title = model.Title;
            activity.Description = model.Description;
            activity.UpdatedDate = DateTime.Now;
            activity.BoardId = model.BoardId;

            await _context.SaveChangesAsync();
            return Ok(activity);
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
            ActivityEntity? activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == id);
            if (activity != null)
            {
                _context.Activities.Remove(activity);
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
