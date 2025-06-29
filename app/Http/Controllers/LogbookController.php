<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use App\Models\LogbookApprover;
use App\Models\PendaftaranPlp;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LogbookController extends Controller
{
    public function index()
    {
        // Get the user's logbooks directly without approver relations
    $logbooks = Logbook::where('user_id', Auth::id())
        ->latest()
        ->get();

    if (request()->wantsJson()) {
        return response()->json($logbooks, 200);
    }

    return Inertia::render('Logbooks', [
        'logbooks' => $logbooks
    ]);
        // Get the user's logbooks with the related approvers and their information
        // $logbooks = Logbook::with(['logbookApprovers.approver:id,name,role'])
        //     ->where('user_id', Auth::id())
        //     ->latest()
        //     ->get();

        // // Transform the logbooks to include the calculated approval status
        // $transformedLogbooks = $logbooks->map(function ($logbook) {
        //     // Get approvals for this logbook
        //     $approvals = $logbook->logbookApprovers;

        //     // Count the different statuses
        //     $approvedCount = $approvals->where('status', 'approved')->count();
        //     $rejectedCount = $approvals->where('status', 'rejected')->count();
        //     $totalApprovers = $approvals->count();

        //     // Calculate the collective status
        //     $collectiveStatus = 'pending';
        //     if ($rejectedCount > 0) {
        //         $collectiveStatus = 'rejected';
        //     } elseif ($approvedCount === $totalApprovers && $totalApprovers > 0) {
        //         $collectiveStatus = 'approved';
        //     }

        //     // Include all the original logbook data plus the calculated status
        //     return [
        //         'id' => $logbook->id,
        //         'user_id' => $logbook->user_id,
        //         'tanggal' => $logbook->tanggal,
        //         'keterangan' => $logbook->keterangan,
        //         'mulai' => $logbook->mulai,
        //         'selesai' => $logbook->selesai,
        //         'dokumentasi' => $logbook->dokumentasi,
        //         'created_at' => $logbook->created_at,
        //         'updated_at' => $logbook->updated_at,
        //         'status' => $collectiveStatus, // The calculated status based on approvers
        //     ];
        // });

        // if (request()->wantsJson()) {
        //     return response()->json($transformedLogbooks, 200); // Changed status code to 200 which is more appropriate for GET requests
        // }

        // return Inertia::render('Logbooks', [
        //     'logbooks' => $transformedLogbooks
        // ]);
    }

    public function indexAll()
    {
        $logbooks = Logbook::latest()->with('user')->get();

        if (request()->wantsJson()) {
            return response()->json($logbooks, 201);
        }

        return Inertia::render('LogbookAll', [
            'logbooks' => $logbooks
        ]);
    }

    public function indexByGuru()
    {
        $user = Auth::user();

        // Get logbooks that need approval from this user
        // Load all approvers to check the complete status
        $logbooks = Logbook::whereHas('logbookApprovers', function ($query) use ($user) {
            $query->where('approver_id', $user->id);
        })
            ->with(['user:id,name', 'logbookApprovers.approver:id,name,role'])
            ->latest()
            ->get();

        $logbooks->transform(function ($logbook) use ($user) {
            // Get all approvals for this logbook
            $allApprovals = $logbook->logbookApprovers;

            // Count statistics for all approvers
            $approvedCount = $allApprovals->where('status', 'approved')->count();
            $rejectedCount = $allApprovals->where('status', 'rejected')->count();
            $pendingCount = $allApprovals->where('status', 'pending')->count();
            $totalApprovers = $allApprovals->count();

            // Get current user's approval status
            $userApproval = $allApprovals->firstWhere('approver_id', $user->id);
            $userApprovalStatus = $userApproval ? $userApproval->status : 'pending';

            // Determine collective status
            $collectiveStatus = 'pending';
            if ($rejectedCount > 0) {
                $collectiveStatus = 'rejected';
            } elseif ($approvedCount === $totalApprovers && $totalApprovers > 0) {
                $collectiveStatus = 'approved';
            }

            // Map all approvers' status
            $approversStatus = $allApprovals->map(function ($approval) {
                return [
                    'id' => $approval->id,
                    'approver_id' => $approval->approver_id,
                    'name' => $approval->approver->name,
                    'role' => $approval->approver->role,
                    'status' => $approval->status,
                    'updated_at' => $approval->updated_at,
                ];
            });

            return [
                'id' => $logbook->id,
                'user' => $logbook->user->name,
                'tanggal' => $logbook->tanggal,
                'keterangan' => $logbook->keterangan,
                'mulai' => $logbook->mulai,
                'selesai' => $logbook->selesai,
                'dokumentasi' => $logbook->dokumentasi,
                'created_at' => $logbook->created_at,
                'updated_at' => $logbook->updated_at,
                'status' => $collectiveStatus,
                'your_approval_status' => $userApprovalStatus,
            ];
        });

        if (request()->wantsJson()) {
            return response()->json($logbooks, 200);
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

        // Begin transaction to ensure all related data is saved together
        DB::beginTransaction();

        try {
            // Create the logbook entry
            $logbook = Logbook::create([
                'user_id' => Auth::id(),
                'tanggal' => $request->tanggal,
                'keterangan' => $request->keterangan,
                'mulai' => $request->mulai,
                'selesai' => $request->selesai,
                'dokumentasi' => $request->dokumentasi,
            ]);

            // Get the current authenticated user (student)
            $mahasiswa = Auth::user();

            // Get the mahasiswa's dosen pembimbing and guru pamong
            $dosenPembimbing = User::where('id', $mahasiswa->dosen_id)->first();
            $guruPamong = User::where('id', $mahasiswa->guru_id)->first();

            // Create logbook approvers entries for both supervisors
            $approvers = [];

            if ($dosenPembimbing) {
                $approvers[] = [
                    'logbook_id' => $logbook->id,
                    'approver_id' => $dosenPembimbing->id,
                    'status' => 'pending',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            if ($guruPamong) {
                $approvers[] = [
                    'logbook_id' => $logbook->id,
                    'approver_id' => $guruPamong->id,
                    'status' => 'pending',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            // Insert all approvers at once if there are any
            if (!empty($approvers)) {
                DB::table('logbook_approvers')->insert($approvers);
            }

            // Commit the transaction
            DB::commit();

            if ($request->wantsJson()) {
                return response()->json(['message' => 'Logbook berhasil dibuat', 'logbook' => $logbook], 201);
            }

            return back()->with('success', 'Logbook berhasil ditambahkan!');
        } catch (\Exception $e) {
            // Rollback the transaction if any error occurs
            DB::rollBack();

            if ($request->wantsJson()) {
                return response()->json(['message' => 'Gagal membuat logbook: ' . $e->getMessage()], 500);
            }

            return back()->with('error', 'Gagal menambahkan logbook: ' . $e->getMessage());
        }
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

    public function updateMultipleApproverStatus(Request $request)
    {
        $user = Auth::user();

        // Validate using your existing format with "logbooks" array
        $request->validate([
            'logbooks' => 'required|array',
            'logbooks.*.id' => 'required|exists:logbooks,id',
            'logbooks.*.status' => 'required|string|in:approved,rejected,pending',
        ]);

        $results = [];

        DB::beginTransaction();

        try {
            foreach ($request->logbooks as $logbookData) {
                $logbookId = $logbookData['id'];
                $status = $logbookData['status'];

                // Find the approval record
                $approval = LogbookApprover::where('logbook_id', $logbookId)
                    ->where('approver_id', $user->id)
                    ->first();

                if (!$approval) {
                    continue; // Skip if not an approver
                }

                // Update approval status
                $approval->status = $status;
                $approval->save();

                // Check all approvals for this logbook
                $allApprovals = LogbookApprover::where('logbook_id', $logbookId)->get();
                $approvedCount = $allApprovals->where('status', 'approved')->count();
                $rejectedExists = $allApprovals->contains('status', 'rejected');
                $totalApprovers = $allApprovals->count();

                // Update logbook status
                $logbook = Logbook::find($logbookId);

                if ($rejectedExists) {
                    $logbook->status = 'rejected';
                } elseif ($approvedCount === $totalApprovers) {
                    $logbook->status = 'approved';
                } else {
                    $logbook->status = 'pending';
                }

                $logbook->save();

                $results[] = [
                    'id' => $logbookId,
                    'status' => $logbook->status
                ];
            }

            DB::commit();

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Status logbook berhasil diperbarui',
                    'results' => $results
                ], 200);
            }

            return redirect()->back()->with('success', 'Status logbook berhasil diperbarui');
        } catch (\Exception $e) {
            DB::rollBack();

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Terjadi kesalahan: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
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
