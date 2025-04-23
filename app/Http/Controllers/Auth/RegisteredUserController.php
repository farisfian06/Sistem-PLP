<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function indexDospem()
    {
        $users = User::where('role', 'Dosen Pembimbing')->get();

        return Inertia::render('Input/InputAkunDosen', [
            'users' => $users
        ]);
    }

    public function indexPamong()
    {
        $users = User::where('role', 'Guru')->get();

        return Inertia::render('Input/InputAkunPamong', [
            'users' => $users
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'nullable|in:Kaprodi,Dosen Koordinator,Dosen Pembimbing,Akademik,Mahasiswa,Observer,Guru',
            'details' => 'nullable|array'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'Mahasiswa',
            'details' => json_encode($request->details)
        ]);

        event(new Registered($user));

        if ($request->expectsJson()) {
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'details' => $user->details
                    ],
                    'token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 201);
        }

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    public function pembuatanAkun(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:Kaprodi,Dosen Koordinator,Dosen Pembimbing,Akademik,Mahasiswa,Observer,Guru',
            'details' => 'nullable|array'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'details' => json_encode($request->details)
        ]);

        event(new Registered($user));

        if (request()->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'details' => $user->details
                    ],
                ]
            ], 201);
        }

//        return back()->with('user', $user);
        return back()->with('success', 'Akun baru telah berhasil dibuat');
    }

    public function updateAkun(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ],
            'role' => 'required|in:Kaprodi,Dosen Koordinator,Dosen Pembimbing,Akademik,Mahasiswa,Observer,Guru',
            'details' => 'nullable|array'
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->details = json_encode($request->details);
        $user->save();

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User updated successfully',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'details' => $user->details
                    ],
                ]
            ]);
        }

        return back()->with('success', 'Akun telah berhasil diperbarui');
    }

    public function deleteAkun($id, Request $request)
    {
        $user = User::findOrFail($id);
        $user->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User deleted successfully',
            ]);
        }

        return back()->with('success', 'Akun telah berhasil dihapus');
    }

}
