<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use App\Models\LogbookApprover;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ValidasiLogbookController extends Controller
{
    public function index()
    {
        $logbooks = Logbook::where('user_id', 18)->latest()->get();
        return Inertia::render('ValidasiLogbook', [
            'logbooks' => $logbooks
        ]);
    }

    public function updateSingleApproverStatus(Request $request, $id)
    {
        $user = Auth::user();

        // Validasi hanya untuk 1 logbook
        $request->validate([
            'status' => 'required|string|in:approved,rejected,pending',
        ]);

        DB::beginTransaction();

        try {
            $status = $request->input('status');

            // Cek apakah user adalah approver untuk logbook ini
            $approval = LogbookApprover::where('logbook_id', $id)
                ->where('approver_id', $user->id)
                ->first();

            if (!$approval) {
                return response()->json([
                    'message' => 'Kamu bukan approver untuk logbook ini.'
                ], 403);
            }

            // Update status approval
            $approval->status = $status;
            $approval->save();

            // Update status keseluruhan logbook
            $allApprovals = LogbookApprover::where('logbook_id', $id)->get();
            $approvedCount = $allApprovals->where('status', 'approved')->count();
            $rejectedExists = $allApprovals->contains('status', 'rejected');
            $totalApprovers = $allApprovals->count();

            $logbook = Logbook::findOrFail($id);

            if ($rejectedExists) {
                $logbook->status = 'rejected';
            } elseif ($approvedCount === $totalApprovers) {
                $logbook->status = 'approved';
            } else {
                $logbook->status = 'pending';
            }

            $logbook->save();

            DB::commit();

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Status logbook berhasil diperbarui',
                    'result' => [
                        'id' => $logbook->id,
                        'status' => $logbook->status
                    ]
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

            return response()->json([
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);;
        }
    }
}
