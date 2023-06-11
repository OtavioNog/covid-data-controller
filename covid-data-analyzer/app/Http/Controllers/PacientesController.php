<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
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

    public function destroy($id)
    {
        $paciente = Paciente::find($id);

        if ($paciente) {
            if ($paciente->perfil) {
                $filename = basename($paciente->perfil);
                Storage::delete('profileImg/' . $filename);

            }
            $paciente->delete();
            return response()->json(['message' => 'Registro do paciente deletado']);

        }

        return response()->json(['message' => 'Paciente não encontrado'], 404);
    } 


    public function store(Request $request)
    {
        $this->validate($request, [
            'nome' => 'required',
            'nascimento' => 'required|date',
            'cpf' => 'required|cpf',
            'telefone' => 'required',
            'perfil' => 'required',
        ]);

        $pacientes = new Paciente;
        $pacientes->nome = $request->input('nome');
        $pacientes->nascimento = $request->input('nascimento');
        $pacientes->cpf = $request->input('cpf');
        $pacientes->telefone = $request->input('telefone');

        if ($request->hasFile('perfil')) {
            $perfil = $request->file('perfil');
            $path = $perfil->store('profileImg');
            $pacientes->perfil = $path;
        } else {
            $pacientes->perfil = null;
        }

        $pacientes->save();

        return response()->json($pacientes, 201);
    }

        public function updateStatus(Request $request, $id)
    {
        $paciente = Paciente::findOrFail($id);
        $paciente->status = $request->input('status');
        $paciente->save();

        return response()->json(['message' => 'Status do paciente atualizado com sucesso']);
    }

}
