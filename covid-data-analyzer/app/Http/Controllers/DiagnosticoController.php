<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sintomas;
use App\Models\Paciente;

class DiagnosticoController extends Controller
{
    public function store(Request $request)
    {   
        $dados = $request->all();
        $sintomas = new Sintomas();

        $sintomas->id_paciente = $dados['pacienteId'];

        if (isset($dados['febre'])) {
            $sintomas->febre = $dados['febre'];
        } else {
            $sintomas->febre = false;
        }
        if (isset($dados['coriza'])) {
            $sintomas->coriza = $dados['coriza'];
        } else {
            $sintomas->coriza = false;
        }
        if (isset($dados['narizentupido'])) {
            $sintomas->nariz_entupido = $dados['narizentupido'];
        } else {
            $sintomas->nariz_entupido = false;
        }
        if (isset($dados['cansaco'])) {
            $sintomas->cansaco = $dados['cansaco'];
        } else {
            $sintomas->cansaco = false;
        }
        if (isset($dados['tosse'])) {
            $sintomas->tosse = $dados['tosse'];
        } else {
            $sintomas->tosse = false;
        }
        if (isset($dados['dorcabeca'])) {
            $sintomas->dor_cabeca = $dados['dorcabeca'];
        } else {
            $sintomas->dor_cabeca = false;
        }
        if (isset($dados['dorcorpo'])) {
            $sintomas->dor_corpo = $dados['dorcorpo'];
        } else {
            $sintomas->dor_corpo = false;
        }
        if (isset($dados['malestar'])) {
            $sintomas->mal_estar = $dados['malestar'];
        } else {
            $sintomas->mal_estar = false;
        }
        if (isset($dados['dorgarganta'])) {
            $sintomas->dor_garganta = $dados['dorgarganta'];
        } else {
            $sintomas->dor_garganta = false;
        }
        if (isset($dados['dificuldaderespirar'])) {
            $sintomas->dif_respirar = $dados['dificuldaderespirar'];
        } else {
            $sintomas->dif_respirar = false;
        }
        if (isset($dados['faltapaladar'])) {
            $sintomas->falta_paladar = $dados['faltapaladar'];
        } else {
            $sintomas->falta_paladar = false;
        }
        if (isset($dados['faltaolfato'])) {
            $sintomas->falta_olfato = $dados['faltaolfato'];
        } else {
            $sintomas->falta_olfato = false;
        }
        if (isset($dados['dificuldadelocomocao'])) {
            $sintomas->dif_locomocao = $dados['dificuldadelocomocao'];
        } else {
            $sintomas->dif_locomocao = false;
        }
        if (isset($dados['diarreia'])) {
            $sintomas->diarreia = $dados['diarreia'];
        } else {
            $sintomas->diarreia = false;
        }

        if (isset($dados['temperatura'])) {
            $sintomas->temperatura = $dados['temperatura'];
        } else {
            $sintomas->temperatura = 404;
        }

        if (isset($dados['pressaoSistolica'])) {
            $sintomas->pa_sistolica = $dados['pressaoSistolica'];
        } else {
            $sintomas->pa_sistolica = 404;
        }

        if (isset($dados['pressaoDiastolica'])) {
            $sintomas->pa_diastolica = $dados['pressaoDiastolica'];
        } else {
            $sintomas->pa_diastolica = 404;
        }

        if (isset($dados['frequenciaRespiratoria'])) {
            $sintomas->frq_respiratoria = $dados['frequenciaRespiratoria'];
        } else {
            $sintomas->frq_respiratoria = 404;
        }

        // Salva os dados na tabela "sintomas"
        $sintomas->save();

        return response()->json(['message' => 'Dados salvos com sucesso'], 200);
    }

    public function obterDiagnostico($id)
    {
        $paciente = Paciente::findOrFail($id);
        $sintomas = Sintomas::where('id_paciente', $id)->first();

        $diagnostico = [
            'paciente' => $paciente,
            'sintomas' => $sintomas,
        ];

        return response()->json($diagnostico);
    }
}