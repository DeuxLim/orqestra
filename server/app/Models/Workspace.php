<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    protected $fillable = [
        'name',
        'slug'
    ];

    /* Get workspace owner */
    public function owner()
    {
        return $this->belongsTo(User::class, "owner_user_id");
    }

    public function members()
    {
        // Get workspace users - 2nd argument is needed because pivot table name is custom
        // (workspace_user instead of default user_workspace) 
        return $this->belongsToMany(User::class, 'workspace_user');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function roles()
    {
        return $this->hasMany(WorkspaceRole::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(WorkspacePermission::class, 'workspace_role_permissions');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }
}
