<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use App\Models\User;
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

    public function indexByGuru()
    {
        $user = Auth::user();

        $mahasiswaIds = User::where('guru_id', $user->id)->pluck('id');

        $logbooks = Logbook::whereIn('user_id', $mahasiswaIds)->with('user:id,name')->latest()->get();

        $logbooks->transform(function ($logbook) {
            return [
                'id' => $logbook->id,
                'user' => $logbook->user->name, // Jika user ada, tampilkan namanya
                'tanggal' => $logbook->tanggal,
                'keterangan' => $logbook->keterangan,
                'mulai' => $logbook->mulai,
                'selesai' => $logbook->selesai,
                'dokumentasi' => $logbook->dokumentasi,
                'created_at' => $logbook->created_at,
                'updated_at' => $logbook->updated_at,
                'status' => $logbook->status,
            ];
        });

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
     * Memperbarui status logbook.
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        $logbook = Logbook::findOrFail($id);

        $logbook->status = $request->status;
        $logbook->save();

        return response()->json([
            'message' => 'Logbook status updated successfully',
            'logbook' => $logbook,
        ]);
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
