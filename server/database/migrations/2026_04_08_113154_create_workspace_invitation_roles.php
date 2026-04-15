<?php

use App\Models\WorkspaceInvitation;
use App\Models\WorkspaceRole;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('workspace_invitation_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(WorkspaceInvitation::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(WorkspaceRole::class)->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique([
                'workspace_invitation_id',
                'workspace_role_id'
            ], 'wir_invitation_role_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workspace_invitation_roles');
    }
};
