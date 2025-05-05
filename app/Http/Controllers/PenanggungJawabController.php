<?php

namespace App\Http\Controllers;

use App\Models\PenanggungJawab;
use App\Models\Smk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenanggungJawabController extends Controller
{
    public function index()
    {
        $penanggungJawabs = PenanggungJawab::with('smk')->latest()->get();

        return Inertia::render('PenanggungJawabs/Index', [
            'penanggungJawabs' => $penanggungJawabs
        ]);
    }

    public function show($id)
    {
        $smks = Smk::withCount('pendaftaranPlps')->withCount('penanggungJawabs')->orderBy('name', 'asc')->get();;
        $penanggungJawabs = PenanggungJawab::where('smk_id', $id)->get();

        return Inertia::render('Input/InputSmk', [
            'penanggungJawabs' => $penanggungJawabs,
            'smks' => $smks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nip' => 'nullable|string|max:50',
            'notel' => 'nullable|string|max:50',
            'status' => 'nullable|string|max:50',
            'pangkat' => 'nullable|string|max:100',
            'norek' => 'nullable|string|max:100',
            'norek_an' => 'nullable|string|max:100',
            'nama_bank' => 'nullable|string|max:100',
            'smk_id' => 'required|exists:smks,id',
        ]);

        PenanggungJawab::create($validated);

        return back();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nip' => 'nullable|string|max:50',
            'notel' => 'nullable|string|max:50',
            'status' => 'nullable|string|max:50',
            'pangkat' => 'nullable|string|max:100',
            'norek' => 'nullable|string|max:100',
            'norek_an' => 'nullable|string|max:100',
            'nama_bank' => 'nullable|string|max:100',
            'smk_id' => 'required|exists:smks,id',
        ]);

        $penanggungJawab = PenanggungJawab::findOrFail($id);
        $penanggungJawab->update($validated);

        return back();
    }

    public function destroy($id)
    {
        $penanggungJawab = PenanggungJawab::findOrFail($id);
        $penanggungJawab->delete();

        return back();
    }
}
