<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\LogbookController;
use App\Http\Controllers\PendaftaranPlpController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Menampilkan halaman daftar PLP (untuk user yang sudah login)
Route::get('/pendaftaran-plp', [PendaftaranPlpController::class, 'index'])->name('pendaftaran-plp.index');

// Menyimpan data pendaftaran PLP
Route::post('/pendaftaran-plp', [PendaftaranPlpController::class, 'store'])->name('pendaftaran-plp.store');

// Menampilkan halaman daftar logbook untuk user yang sudah login
Route::get('/logbooks', [LogbookController::class, 'index'])->name('logbooks.index');

// Menyimpan data logbook baru
Route::post('/logbooks', [LogbookController::class, 'store'])->name('logbooks.store')->middleware('auth');

// Menampilkan halaman tambah logbook
Route::get('/logbook/tambah', function () {
    return Inertia::render('TambahLogbook');
})->name('logbook.store');

// Memperbarui logbook
Route::put('/logbooks/{id}', [LogbookController::class, 'update'])->name('logbooks.update')->middleware('auth');

// Menghapus logbook
Route::delete('/logbooks/{id}', [LogbookController::class, 'destroy'])->name('logbooks.destroy')->middleware('auth');
Route::get('/logbooks/{id}', [LogbookController::class, 'show'])->name('logbooks.show');

// Route::get('/admin', [LogbookController::class, 'index'])->middleware('role:Mahasiswa')->name('admin');
// Route::post('/logbooks', [LogbookController::class, 'store'])->middleware('auth')->name('logbooks.store');

Route::get('/validasi-logbook', function () {
    return Inertia::render('ValidasiLogbook');
});

require __DIR__.'/auth.php';
