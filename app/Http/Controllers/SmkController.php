<?php

namespace App\Http\Controllers;

use App\Models\Smk;
use http\Env\Response;
use Illuminate\Http\Request;

class SmkController extends Controller
{
    public function index() {
        $smks = Smk::orderBy('name', 'asc')->get();
        return response()->json($smks, 200);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
        ]);

        $smk = Smk::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'SMK berhasil dimasukkan', 'smk' => $smk], 201);
    }

    public function show(Smk $smk)
    {
        return response()->json($smk);
    }

    public function update(Request $request, Smk $smk)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $smk->update($request->all());

        return response()->json(['message' => 'Updated successfully', 'data' => $smk]);
    }

    public function destroy(Smk $smk)
    {
        $smk->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
