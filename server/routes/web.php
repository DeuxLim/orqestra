<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

// Register
Route::post('/register', [AuthController::class, 'register']);

// Login
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Authenticated (Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Get current user
    Route::get('/user', fn(Request $request) => $request->user());

    // Resend verification email
    Route::post('/email/verification-notification', [AuthController::class, 'resend'])
        ->middleware('throttle:6,1'); // prevent spam
});

// Verify email (link from email)
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect(env('FRONTEND_URL') . '/email-verified');
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');
