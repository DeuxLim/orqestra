<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\WorkspacePermission;
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
        Schema::create('workspace_role_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(WorkspaceRole::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(WorkspacePermission::class)->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique([
                'workspace_role_id',
                'workspace_permission_id'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_permission');
    }
};
