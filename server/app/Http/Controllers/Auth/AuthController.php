<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

/* Service And Repository pattern is not used here to avoid additional complexity for Authentication */

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'username' => 'required|string|unique:users|max:100',
            'email' => 'required|string|unique:users|email|max:100',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->mixedCase()
                    ->symbols(),
            ]
        ]);

        
        $user = User::create($validated);

        event(new Registered($user));

        return response()->json([
            "success" => true,
            "message" => "User registered successfully",
            "data" => $user
        ], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                "success" => true,
                "messsage" => "User logged in successfully"
            ]);
        }

        return response()->json([
            "success" => false,
            "message" => "Invalid email or password."
        ], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            "success" => true,
            "message" => "Logged out successfully."
        ], 200);
    }

    public function forgotPassword() {}

    public function resetPassword() {}
}
