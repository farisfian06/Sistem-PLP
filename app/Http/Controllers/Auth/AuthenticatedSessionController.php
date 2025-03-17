<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        
        $user = User::where("email", $request->email)->firstOrFail();

        if ($request->expectsJson()) {
        $token = $user->createToken("auth_token")->plainTextToken;
        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'user_token' => $token,
            'token_type' => 'Bearer',
            'status' => 'loggedin',
            'verified' => true
        ], 200);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {

        if ($request->expectsJson() || $request->bearerToken()) {
            $user = $request->user();
            $user->currentAccessToken()->delete();
            
            return response()->json([
                'status' => 'success',
                'message' => 'Logout success'
            ]);
        }
        
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
