<?php

use App\Models\Customer;
use App\Models\User;
use App\Models\Workspace;
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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(Workspace::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Customer::class)->constrained()->cascadeOnDelete();

            $table->foreignIdFor(User::class, 'created_by_user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignIdFor(User::class, 'assigned_to_user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('ticket_number');
            $table->string('title')->nullable();
            $table->text('description')->nullable();

            $table->string('status');
            $table->string('priority');

            $table->timestamps();

            // indexes (FKs already indexed automatically)
            $table->index('status');
            $table->index('priority');

            // unique per workspace
            $table->unique(['workspace_id', 'ticket_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
