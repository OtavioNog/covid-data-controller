<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sintomas extends Model
{
    protected $table = 'sintomas';
    
    protected $fillable = [
        'id_paciente',
        'febre',
        'coriza',
        'nariz_entupido',
        'cansaco',
        'tosse',
        'dor_cabeca',
        'dor_corpo',
        'mal_estar',
        'dor_garganta',
        'dif_respirar',
        'falta_paladar',
        'falta_olfato',
        'dif_locomocao',
        'diarreia',
        'temperatura',
        'pa_sistolica',
        'pa_diastolica',
        'frq_respiratoria',
    ];
}