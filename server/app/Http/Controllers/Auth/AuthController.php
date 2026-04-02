<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\Auth\AuthService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/* Service And Repository pattern is not used here to avoid additional complexity for Authentication */

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $user = $this->authService->register($request->validated());

        Auth::login($user);

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

            $user = $request->user();

            if (! $user->hasVerifiedEmail()) {
                Auth::logout();

                return response()->json([
                    'message' => 'Please verify your email first.'
                ], 403);
            }

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

    public function resend(Request $request)
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.'
            ], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification link sent!'
        ]);
    }

    public function forgotPassword() {}

    public function resetPassword() {}
}
