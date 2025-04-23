<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use App\Models\PendaftaranPlp;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogbookController extends Controller
{
    public function index()
    {
        $logbooks = Logbook::where('user_id', Auth::id())->latest()->get();

        if (request()->wantsJson()) {
            return response()->json($logbooks, 201);
        }

        return Inertia::render('Logbooks', [
            'logbooks' => $logbooks
        ]);
    }

    public function indexAll()
    {
        $logbooks = Logbook::latest()->get();

        if (request()->wantsJson()) {
            return response()->json($logbooks, 201);
        }

        return Inertia::render('Logbooks', [
            'logbooks' => $logbooks
        ]);
    }

    public function indexByGuru()
    {
        $user = Auth::user();

        if ($user->role == "Guru") {
            $mahasiswaIds = User::where('guru_id', $user->id)->pluck('id');
        } else {
            $mahasiswaIds = PendaftaranPlp::where('dosen_pembimbing', $user->id)->pluck('user_id');
        }

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

        if (request()->wantsJson()) {
            return response()->json($logbooks, 201);
        }

        return Inertia::render('ValidasiLogbook', [
            'logbooks' => $logbooks
        ]);
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

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Logbook berhasil dibuat', 'logbook' => $logbook], 201);
        }

        return back()->with('success', 'Logbook berhasil ditambahkan!');
    }

    /**
     * Menampilkan logbook tertentu.
     */
    public function show($id)
    {
        $logbook = Logbook::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($logbook, 200);
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

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Logbook berhasil diperbarui', 'logbook' => $logbook], 201);
        }

        return redirect()->route('logbooks.index')->with('success', 'Logbook berhasil diperbarui!');
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

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Logbook status updated successfully', 'logbook' => $logbook], 201);
        }

        return redirect()->back()->with('message', 'Logbook status updated successfully');
    }

    public function updateMultipleStatus(Request $request)
    {
        $request->validate([
            'logbooks' => 'required|array',
            'logbooks.*.id' => 'required|exists:logbooks,id',
            'logbooks.*.status' => 'required|string|in:pending,approved,rejected',
        ]);

        $updatedLogbooks = [];

        foreach ($request->logbooks as $logbookData) {
            $logbook = Logbook::findOrFail($logbookData['id']);
            $logbook->status = $logbookData['status'];
            $logbook->save();
            $updatedLogbooks[] = $logbook;
        }

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Logbook statuses updated successfully',
                'logbooks' => $updatedLogbooks
            ], 200);
        }

        return redirect()->back()->with('success', 'Update status logbook berhasil dilakukan');
    }


    /**
     * Menghapus logbook.
     */
    public function destroy($id)
    {
        $logbook = Logbook::where('user_id', Auth::id())->findOrFail($id);
        $logbook->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Logbook berhasil dihapus'], 201);
        }

        return redirect()->route('logbooks.index')->with('success', 'Logbook berhasil dihapus!');
    }
}
