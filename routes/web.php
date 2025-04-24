<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KeminatanController;
use App\Http\Controllers\LogbookController;
use App\Http\Controllers\PendaftaranPlpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SmkController;
use App\Http\Controllers\ValidasiLogbookController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

// Redirect ke login/dashboard saat buka website
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('/logbooks')->group(function () {
        Route::middleware('role:Mahasiswa')->group(function () {
            Route::get('/', [LogbookController::class, 'index'])->name('logbooks.index');
            Route::post('/', [LogbookController::class, 'store'])->name('logbooks.store');
            Route::put('/{id}', [LogbookController::class, 'update'])->name('logbooks.update');
            Route::delete('/{id}', [LogbookController::class, 'destroy']);
        });
        Route::middleware('role:Guru,Dosen Pembimbing')->group(function () {
            Route::get('/validasi', [LogbookController::class, 'indexByGuru'])->name('logbooks.validasi');
            Route::put('/validasi/{id}', [LogbookController::class, 'updateStatus']);
            Route::patch('/validasi', [LogbookController::class, 'updateMultipleStatus']);
        });
        Route::middleware('role:Kaprodi,Dosen Koordinator,Akademik')->group(function () {
            Route::get('/all', [LogbookController::class, 'indexAll']);
        });
    });

    Route::prefix('/profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('/akun')->group(function () {
        Route::middleware('role:Kaprodi,Dosen Koordinator,Akademik')->group(function () {
            Route::get('/dosen', [RegisteredUserController::class, 'indexDospem'])->name('input-akun-dosen');
            Route::get('/pamong', [RegisteredUserController::class, 'indexPamong'])->name('input-akun-pamong');
            Route::post('/', [RegisteredUserController::class, 'pembuatanAkun'])->name('pembuatan-akun');
            Route::patch('/{id}', [RegisteredUserController::class, 'updateAkun'])->name('update-akun');
            Route::delete('/{id}', [RegisteredUserController::class, 'deleteAkun'])->name('hapus-akun');
        });
    });

    Route::prefix('/smk')->group(function () {
        Route::middleware('role:Kaprodi,Dosen Koordinator,Akademik')->group(function () {
            Route::get('/', [SmkController::class, 'index'])->name('input-smk');
            Route::post('/', [SmkController::class, 'store'])->name('post-smk');
            Route::patch('/{id}', [SmkController::class, 'update'])->name('patch-smk');
            Route::delete('/{id}', [SmkController::class, 'destroy'])->name('delete-smk');
        });
    });

    Route::prefix('/keminatan')->group(function () {
        Route::middleware('role:Kaprodi,Dosen Koordinator,Akademik')->group(function () {
            Route::get('/', [KeminatanController::class, 'index'])->name('input-keminatan');
            Route::post('/', [KeminatanController::class, 'store'])->name('post-keminatan');
            Route::patch('/{id}', [KeminatanController::class, 'update'])->name('patch-keminatan');
            Route::delete('/{id}', [KeminatanController::class, 'destroy'])->name('delete-keminatan');
        });
    });

    Route::prefix('/pendaftaran-plp')->group(function () {
        Route::middleware('role:Mahasiswa')->group(function () {
            Route::get('/', [PendaftaranPlpController::class, 'index'])->name('pendaftaran-plp.index');
            Route::post('/', [PendaftaranPlpController::class, 'store'])->name('pendaftaran-plp.store');
        });
        Route::middleware('role:Kaprodi,Dosen Koordinator,Akademik')->group(function () {
            Route::get('/pembagian', [PendaftaranPlpController::class, 'indexAll'])->name('pembagian-plp');
            Route::patch('/{id}', [PendaftaranPlpController::class, 'assign'])->name('pembagian-plp.assign');
            Route::patch('/', [PendaftaranPlpController::class, 'assignBatch'])->name('pembagian-plp.assign-batch');
        });
    });

});

require __DIR__.'/auth.php';
