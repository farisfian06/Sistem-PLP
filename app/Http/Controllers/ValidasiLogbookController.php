<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
}
