<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paciente;

class PacientesController extends Controller
{
    public function index()
    {
        $pacientes = Paciente::all();
        return response()->json($pacientes);
    } 

    public function show($id)
    {
    $pacientes = Paciente::find($id);
    
    if (!$pacientes) {
        return response()->json(['message' => 'Paciente não encontrado'], 404);
    }
    
    return response()->json($pacientes);
    }   
}
