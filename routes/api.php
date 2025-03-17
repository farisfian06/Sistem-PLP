<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\LogbookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return  response()->json($request->user());
    });

    Route::get('/logbooks', [LogbookController::class, 'index'])->middleware('role:Kaprodi,Mahasiswa');
    Route::post('/logbooks', [LogbookController::class, 'store']);
});

