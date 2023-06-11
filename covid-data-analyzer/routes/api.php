<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PacientesController;
use App\Http\Controllers\DiagnosticoController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/pacientes', [PacientesController::class, 'index']);
Route::get('/pacientes/{id}', [PacientesController::class, 'show']);

Route::delete('/pacientes/{id}', [PacientesController::class, 'destroy']);

Route::post('/pacientes', [PacientesController::class, 'store']);

Route::get('/profileImg/{filename}', function ($filename) {
    $path = storage_path('app/profileImg/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path);
});

Route::post('/diagnostico', [DiagnosticoController::class, 'store']);
Route::get('/diagnostico/{id}', [DiagnosticoController::class, 'obterDiagnostico']);
Route::patch('/pacientes/{id}', [PacientesController::class, 'updateStatus']);
