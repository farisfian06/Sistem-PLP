<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use App\Models\PendaftaranPlp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role == "Mahasiswa") {

            $pendaftaranPlp = PendaftaranPlp::with(['penempatanSmk', 'dosenPembimbing'])->where('user_id', $user->id)->get();
            $guru = User::where('id', $user->guru_id)->value('name');
            $logbookDisetujui = Logbook::where('user_id', $user->id)->where('status', 'approved')->count();

            return Inertia::render('Dashboard/Dashboard', [
                'pendaftaranPlp' => $pendaftaranPlp,
                'guru' => $guru,
                'logbookDisetujui' => $logbookDisetujui,
            ]);

        } else if ($user->role == "Dosen Pembimbing" || $user->role == "Guru") {

            if ($user->role == "Guru") {
                $mahasiswaIds = User::where('guru_id', $user->id)->pluck('id');
                $mahasiswaDibimbing = User::where('guru_id', $user->id)->count();
            } else {
                $mahasiswaIds = PendaftaranPlp::where('dosen_pembimbing', $user->id)->pluck('user_id');
                $mahasiswaDibimbing = PendaftaranPlp::where('dosen_pembimbing', $user->id)->count();
            }

            $logbookDisetujui = Logbook::whereIn('user_id', $mahasiswaIds)->where('status', 'approved')->count();
            $logbookDiajukan = Logbook::whereIn('user_id', $mahasiswaIds)->where('status', 'pending')->count();
            $logbookDitolak = Logbook::whereIn('user_id', $mahasiswaIds)->where('status', 'rejected')->count();

            return Inertia::render('Dashboard/Dashboard', [
                'mahasiswaDibimbing' => $mahasiswaDibimbing,
                'logbookDisetujui' => $logbookDisetujui,
                'logbookDiajukan' => $logbookDiajukan,
                'logbookDitolak' => $logbookDitolak,
            ]);
        } else if ($user->role == "Kaprodi" || $user->role == "Dosen Koordinator" || $user->role == "Akademik" || $user->role == "Admin") {

            $menungguPembagianPlp = PendaftaranPlp::whereNull('penempatan')->count();
            $mahasiswaTerdaftarPlp = PendaftaranPlp::whereNotNull('penempatan')->count();
            $dosenPembimbingTerdaftar = User::where('role', 'Dosen Pembimbing')->count();
            $guruPamongTerdaftar = User::where('role', 'Guru')->count();

            return Inertia::render('Dashboard/Dashboard', [
                'menungguPembagian' => $menungguPembagianPlp,
                'mahasiswaTerdaftar' => $mahasiswaTerdaftarPlp,
                'dosenPembimbingTerdaftar' => $dosenPembimbingTerdaftar,
                'guruPamongTerdaftar' => $guruPamongTerdaftar,
            ]);
        }

        return Inertia::render('Dashboard/Dashboard');
    }

//    public function index()
//    {
//        $keminatans = Keminatan::all();
//        if (request()->wantsJson()) {
//            return response()->json($keminatans, 200);
//        }
//
//        return Inertia::render('Dashboard/Dashboard', [
//            'keminatans' => $keminatans
//        ]);
//    }
}
