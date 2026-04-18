<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\Workspace;
use App\Models\WorkspaceRole;
use App\Models\WorkspaceUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthService
{
    private function createWorkspaceWithUniqueSlug(String $name, User $user)
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (true) {
            try {
                return Workspace::create([
                    'name' => $name,
                    'slug' => $slug,
                    'owner_user_id' => $user->id,
                ]);
            } catch (\Illuminate\Database\QueryException $e) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
        }
    }

    public function register(array $data)
    {
        return DB::transaction(function () use ($data) {

            // Create user
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => $data['password'],
            ]);

            // Create workspace
            $workspace = $this->createWorkspaceWithUniqueSlug(
                $data['workspace_name'],
                $user
            );

            // Attach user<->workspace relationship
            $workspaceUser = WorkspaceUser::create([
                'workspace_id' => $workspace->id,
                'user_id' => $user->id,
                'joined_at' => now(),
            ]);

            // Create default roles per workspace
            $defaultWorkspaceRoles = collect(config('workspace.default_roles'))
                ->map(function ($role) use ($workspace) {
                    return $workspace->roles()->create($role);
                });

            // Get role
            $ownerRole = $defaultWorkspaceRoles->firstWhere('slug', 'owner');

            // Attach role to user
            $workspaceUser->roles()->attach($ownerRole->id);

            return $user;
        });
    }
}
