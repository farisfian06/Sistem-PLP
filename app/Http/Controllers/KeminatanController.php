<?php

namespace App\Http\Controllers;

use App\Models\Keminatan;
use Illuminate\Http\Request;

class KeminatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $keminatans = Keminatan::all();
        return response()->json($keminatans);
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

        return response()->json([
            'message' => 'Keminatan berhasil dibuat',
            'keminatan' => $keminatan
        ], 201);
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

        return response()->json([
            'message' => 'Keminatan berhasil diperbarui',
            'keminatan' => $keminatan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $keminatan = Keminatan::findOrFail($id);
        $keminatan->delete();

        return response()->json(['message' => 'Keminatan berhasil dihapus']);
    }
}
