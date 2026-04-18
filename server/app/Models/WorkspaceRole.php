<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkspaceRole extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'isSystem',
    ];

    public function users()
    {
        return $this->belongsToMany(WorkspaceUser::class);
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(WorkspacePermission::class, 'workspace_role_permissions');
    }
}
