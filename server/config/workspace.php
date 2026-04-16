<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default system roles
    |--------------------------------------------------------------------------
    |
    | Used on workspace creation
    | default roles will automatically be added to the workspace
    | each workspace can have their own roles
    | default roles are immutable
    |
    */
    'default_roles' => [
        [
            'name' => 'Owner',
            'slug' => 'owner',
            'description' => 'Full control over the workspace. Can manage users, roles, permissions, settings, and all data.',
            'is_system' => true,
        ],
        [
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Manages workspace operations, users, and tickets, but does not own the workspace.',
            'is_system' => true,
        ],
        [
            'name' => 'Agent',
            'slug' => 'agent',
            'description' => 'Handles tickets, customer interactions, and daily support work.',
            'is_system' => true,
        ],
        [
            'name' => 'Member',
            'slug' => 'member',
            'description' => 'Has limited access to workspace data based on assigned permissions.',
            'is_system' => true,
        ],
    ],

];
