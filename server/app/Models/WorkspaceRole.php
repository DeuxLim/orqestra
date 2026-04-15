<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkspaceRole extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class, 'workspace_user_roles');
    }

    public function workspaces()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function workspacePermissions()
    {
        return $this->belongsToMany(WorkspacePermission::class, 'workspace_role_permissions');
    }
}
