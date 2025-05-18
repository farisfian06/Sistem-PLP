<?php

namespace App\Http\Controllers;

use App\Models\Keminatan;
use App\Models\PendaftaranPlp;
use App\Models\Smk;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PendaftaranPlpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $smks = Smk::orderBy('name')->get(['id', 'name']);
        $keminatans = Keminatan::orderBy('name')->get(['id', 'name']);
        $pendaftaranPlp = PendaftaranPlp::where('user_id', Auth::id())->latest()->get();

        if (request()->wantsJson()) {
            return response()->json($pendaftaranPlp, 201);
        }

        return Inertia::render(
            'PendaftaranPlp',
            ['user' => $user, 'smks' => $smks, 'keminatans' => $keminatans, 'pendaftaranPlp' => $pendaftaranPlp]
        );
    }

    public function indexBySmk($id)
    {
        $smks = Smk::withCount('pendaftaranPlps')->withCount('penanggungJawabs')->orderBy('name', 'asc')->get();;
        $pendaftaranPlp = PendaftaranPlp::where('penempatan', $id)->with('user.mahasiswaPamong')->latest()->get();

        if (request()->wantsJson()) {
            return response()->json($pendaftaranPlp, 201);
        }

        return Inertia::render('Input/InputSmk', [
            'pendaftaranPlps' => $pendaftaranPlp,
            'smks' => $smks,
        ]);
    }

    public function indexAll()
    {
        $pendaftaranPlp = PendaftaranPlp::with(['user', 'pilihanSmk1', 'pilihanSmk2', 'keminatan'])->latest()->get();
        $smk = Smk::orderBy('name')->orderBy('name', 'asc')->get(['id', 'name']);
        $dospem = User::where('role', 'Dosen Pembimbing')->orderBy('name', 'asc')->get();
        $guru = User::where('role', 'Guru')->orderBy('name', 'asc')->get();

        if (request()->wantsJson()) {
            return response()->json($pendaftaranPlp, 201);
        }

        return Inertia::render('PembagianPlp', ['pendaftaranPlp' => $pendaftaranPlp, 'smk' => $smk, 'dospem' => $dospem, 'guru' => $guru]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    { {
            $request->validate([
                'keminatan_id' => 'required|exists:keminatans,id',
                'nilai_plp_1' => 'required|in:A,B+,B,C+,C,D,E,Belum',
                'nilai_micro_teaching' => 'required|in:A,B+,B,C+,C,D,E,Belum',
                'pilihan_smk_1' => 'required|exists:smks,id',
                'pilihan_smk_2' => 'required|exists:smks,id',
            ]);

            $pendaftaranPlp = PendaftaranPlp::create([
                'user_id' => Auth::id(),
                'keminatan_id' => $request->keminatan_id,
                'nilai_plp_1' => $request->nilai_plp_1,
                'nilai_micro_teaching' => $request->nilai_micro_teaching,
                'pilihan_smk_1' => $request->pilihan_smk_1,
                'pilihan_smk_2' => $request->pilihan_smk_2,
            ]);

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Pendaftaran PLP berhasil dibuat',
                    'pendaftaran_plp' => $pendaftaranPlp
                ], 201);
            }

            return redirect()->back()->with('success', 'Message');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function assign(Request $request, string $id)
    {
        // Find the Pendaftaran PLP record by ID
        $pendaftaran = PendaftaranPlp::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'penempatan' => 'nullable|exists:smks,id',
            'dosen_pembimbing' => 'required|exists:users,id',
            'guru_pamong' => 'required|exists:users,id',
        ]);

        // Update penempatan pada Pendaftaran PLP
        $pendaftaran->update([
            'penempatan' => $validatedData['penempatan'],
        ]);

        // Ambil user (mahasiswa) terkait pendaftaran ini
        $mahasiswa = $pendaftaran->user;

        // Update dosen_id dan guru_id mahasiswa (kalau memang keduanya ingin diisi dengan dosen_pembimbing)
        $mahasiswa->update([
            'dosen_id' => $validatedData['dosen_pembimbing'],
            'guru_id' => $validatedData['guru_pamong'], // Jika memang dosen pembimbing dianggap sebagai guru juga
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Berhasil menambahkan penempatan dan dosen pembimbing',
            ], 201);
        }

        // Return a JSON response
        return response()->json([
            'message' => 'Berhasil menambahkan penempatan dan dosen pembimbing',
            'pendaftaran' => $pendaftaran,
            'mahasiswa' => $mahasiswa,
        ]);
    }


    public function assignBatch(Request $request)
    {
        $validated = $request->validate([
            'pendaftarans' => 'required|array',
            'pendaftarans.*.id' => 'required|exists:pendaftaran_plps,id',
            'pendaftarans.*.penempatan' => 'nullable|exists:smks,id',
            'pendaftarans.*.dosen_pembimbing' => 'nullable|exists:users,id',
            'pendaftarans.*.guru_pamong' => 'nullable|exists:users,id',
        ]);

        $updated = [];

        DB::transaction(function () use ($validated, &$updated) {
            foreach ($validated['pendaftarans'] as $data) {
                $pendaftaran = PendaftaranPlp::find($data['id']);
                if ($pendaftaran) {
                    $mahasiswa = $pendaftaran->user;

                    // Only update penempatan if it exists in request (even if null or NaN)
                    if (array_key_exists('penempatan', $data)) {
                        $pendaftaran->update([
                            'penempatan' => $data['penempatan'], // allow null or actual value
                        ]);
                    }

                    $mahasiswaUpdateData = [];

                    if (array_key_exists('dosen_pembimbing', $data)) {
                        $mahasiswaUpdateData['dosen_id'] = $data['dosen_pembimbing']; // can be null
                    }

                    if (array_key_exists('guru_pamong', $data)) {
                        $mahasiswaUpdateData['guru_id'] = $data['guru_pamong']; // can be null
                    }

                    if (!empty($mahasiswaUpdateData)) {
                        $mahasiswa->update($mahasiswaUpdateData);
                    }

                    $updated[] = $pendaftaran;
                }
            }
        });



        return back()->with('success', 'Data pada database telah berhasil diperbarui.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
