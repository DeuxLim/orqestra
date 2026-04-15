<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to_user_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function comments()
    {
        return $this->hasMany(TicketComment::class);
    }
}
