<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogbookController extends Controller
{
    public function index()
    {
        $logbooks = Logbook::where('user_id', Auth::id())->latest()->get();
        return response()->json($logbooks);
    }

    public function indexAll()
    {
        $logbooks = Logbook::latest()->get();
        return response()->json($logbooks);
    }

    /**
     * Menyimpan logbook baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'keterangan' => 'required|string',
            'mulai' => 'required|date_format:H:i:s',
            'selesai' => 'required|date_format:H:i:s|after:mulai',
            'dokumentasi' => 'required|string',
        ]);

        $logbook = Logbook::create([
            'user_id' => Auth::id(),
            'tanggal' => $request->tanggal,
            'keterangan' => $request->keterangan,
            'mulai' => $request->mulai,
            'selesai' => $request->selesai,
            'dokumentasi' => $request->dokumentasi,
        ]);

        return response()->json(['message' => 'Logbook berhasil dibuat', 'logbook' => $logbook], 201);
    }

    /**
     * Menampilkan logbook tertentu.
     */
    public function show($id)
    {
        $logbook = Logbook::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($logbook);
    }

    /**
     * Memperbarui logbook.
     */
    public function update(Request $request, $id)
    {
        $logbook = Logbook::where('user_id', Auth::id())->findOrFail($id);

        $request->validate([
            'tanggal' => 'required|date',
            'keterangan' => 'required|string',
            'mulai' => 'required|date_format:H:i:s',
            'selesai' => 'required|date_format:H:i:s|after:mulai',
            'dokumentasi' => 'required|string',
        ]);

        $logbook->update($request->all());

        return response()->json(['message' => 'Logbook berhasil diperbarui', 'logbook' => $logbook]);
    }

    /**
     * Menghapus logbook.
     */
    public function destroy($id)
    {
        $logbook = Logbook::where('user_id', Auth::id())->findOrFail($id);
        $logbook->delete();

        return response()->json(['message' => 'Logbook berhasil dihapus']);
    }
}
