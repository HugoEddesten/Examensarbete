﻿using System.ComponentModel.DataAnnotations;

namespace Business.Models.Dtos.Workspace;

public class CreateWorkspaceDto : DtoBase
{
    [Required]
    public string Title { get; set; } = null!;
    public Guid? WorkspaceLayoutId { get; set; }
}
