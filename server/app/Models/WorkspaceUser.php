<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkspaceUser extends Model
{
    protected $fillable = [
        'workspace_id',
        'user_id',
        'joined_at',
    ];

    public function workspaces()
    {
        return $this->belongsToMany(Workspace::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function roles()
    {
        return $this->belongsToMany(WorkspaceRole::class, 'workspace_user_roles');
    }
}
