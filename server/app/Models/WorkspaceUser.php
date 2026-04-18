<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkspaceUser extends Model
{
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
        return $this->hasMany(WorkspaceRole::class);
    }
}
