<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'details' => 'array|nullable'
        ]);

        // Update the user data
        $user->name = $validated['name'];
        $user->email = $validated['email'];

        // Handle the JSON details field
        $details = $user->details ? json_decode($user->details, true) : [];
        if($details != null) {

            if (isset($validated['details']['nim'])) {
                $details['nim'] = $validated['details']['nim'];
            }

            if (isset($validated['details']['angkatan'])) {
                $details['angkatan'] = $validated['details']['angkatan'];
            }

            if (isset($validated['details']['phone'])) {
                $details['phone'] = $validated['details']['phone'];
            }

            if (isset($validated['details']['nip'])) {
                $details['nip'] = $validated['details']['nip'];
            }

            $user->details = json_encode($details);
        }

        // Save only if email was changed to avoid unnecessary updates
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        try {
            $user->save();
        } catch (\Exception $e) {
            Log::error('Profile update failed for user ID ' . $user->id . ': ' . $e->getMessage(), [
                'user_id' => $user->id,
                'input' => $validated,
                'exception' => $e
            ]);
            // Optionally you may redirect back with error
            return Redirect::route('profile.edit')->with('status', 'Update gagal. Silakan coba lagi.');
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
