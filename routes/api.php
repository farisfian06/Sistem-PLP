<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredGuruPamongContoller;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\LogbookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

Route::group(['prefix' => 'guru-pamong'], function () {
    Route::post('/register', [RegisteredGuruPamongContoller::class, 'store']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::group(['prefix' => 'guru-pamong'], function () {
        Route::put('/logbook/validasi/{id}', [LogbookController::class, 'updateStatus'])->name('logbooks.updateStatus');
    });

    Route::get('/logbooks', [LogbookController::class, 'index'])->middleware('role:Kaprodi,Mahasiswa');
    Route::post('/logbooks', [LogbookController::class, 'store'])->name('logbooks.store');
});
