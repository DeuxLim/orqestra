<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkspacePermission extends Model
{
    public function roles()
    {
        return $this->belongsToMany(WorkspaceRole::class, 'workspace_role_permissions');
    }

    public function workspaces()
    {
        return $this->belongsToMany(Workspace::class, 'workspace_role_permissions');
    }
}
