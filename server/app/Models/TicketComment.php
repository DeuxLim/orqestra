<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketComment extends Model
{
    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
