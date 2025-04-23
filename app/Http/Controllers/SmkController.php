<?php

namespace App\Http\Controllers;

use App\Models\Smk;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SmkController extends Controller
{
    public function index()
    {
        $smks = Smk::orderBy('name', 'asc')->get();

        if (request()->wantsJson()) {
            return response()->json($smks, 200);
        }

        return Inertia::render('Input/InputSmk', [
            'smks' => $smks
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $smk = Smk::create([
            'name' => $request->name,
        ]);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'SMK berhasil dimasukkan', 'smk' => $smk], 201);
        }

        return back()->with('success', 'Data sekolah baru telah berhasil dimasukkan');
    }

    public function show(Smk $smk)
    {
        return response()->json($smk);
    }

    public function update(Request $request, $id)
    {
        $smk = Smk::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $smk->name = $request->name;
        $smk->save();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Updated successfully', 'data' => $smk]);
        }

        return back()->with('success', 'Data sekolah telah berhasil diperbarui');
    }

    public function destroy($id)
    {
        $smk = Smk::findOrFail($id);
        $smk->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Deleted successfully']);
        }

        return back()->with('success', 'Data sekolah telah berhasil dihapus');
    }
}
