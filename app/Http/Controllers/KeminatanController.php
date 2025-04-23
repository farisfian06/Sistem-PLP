<?php

namespace App\Http\Controllers;

use App\Models\Keminatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeminatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $keminatans = Keminatan::all();
        if (request()->wantsJson()) {
            return response()->json($keminatans, 200);
        }

        return Inertia::render('Input/InputKeminatan', [
            'keminatans' => $keminatans
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|unique:keminatans,name|max:255',
        ]);

        $keminatan = Keminatan::create($validatedData);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Keminatan berhasil dibuat',
                'keminatan' => $keminatan
            ], 201);
        }

        return back()->with('success', 'Data keminatan baru telah berhasil dimasukkan');

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $keminatan = Keminatan::findOrFail($id);
        return response()->json($keminatan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $keminatan = Keminatan::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|unique:keminatans,name|max:255',
        ]);

        $keminatan->update($validatedData);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Keminatan berhasil diperbarui',
                'keminatan' => $keminatan
            ]);
        }

        return back()->with('success', 'Data keminatan telah berhasil diperbarui');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $keminatan = Keminatan::findOrFail($id);
        $keminatan->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Keminatan berhasil dihapus']);
        }

        return back()->with('success', 'Data sekolah telah berhasil dihapus');

    }
}
