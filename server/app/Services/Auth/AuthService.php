<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthService
{
    private function createWorkspaceWithUniqueSlug(String $name)
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (true) {
            try {
                return Workspace::create([
                    'name' => $name,
                    'slug' => $slug,
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
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => $data['password'],
            ]);

            $workspace = $this->createWorkspaceWithUniqueSlug(
                $data['workspace_name']
            );

            $user->workspaces()->attach($workspace->id, [
                'role' => 'owner',
            ]);

            return $user;
        });
    }
}
