<?php

use Illuminate\Support\Facades\Route;
use App\Models\Paciente;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pacientes', function() {
    $pacientes = Paciente::all();
    return response()->json($pacientes);
});