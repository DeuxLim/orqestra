<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'owner_user_id',
    ];

    /* Get workspace owner */
    public function owner()
    {
        return $this->belongsTo(User::class, "owner_user_id");
    }

    public function members()
    {
        return $this->belongsToMany(WorkspaceUser::class);
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
