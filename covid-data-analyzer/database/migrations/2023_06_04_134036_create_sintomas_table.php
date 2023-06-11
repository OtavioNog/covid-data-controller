<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
    Schema::create('sintomas', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('id_paciente');
        $table->foreign('id_paciente')->references('id')->on('pacientes')->onDelete('cascade');
        $table->boolean('febre')->default(0);
        $table->boolean('coriza')->default(0);
        $table->boolean('nariz_entupido')->default(0);
        $table->boolean('cansaco')->default(0);
        $table->boolean('tosse')->default(0);
        $table->boolean('dor_cabeca')->default(0);
        $table->boolean('dor_corpo')->default(0);
        $table->boolean('mal_estar')->default(0);
        $table->boolean('dor_garganta')->default(0);
        $table->boolean('dif_respirar')->default(0);
        $table->boolean('falta_paladar')->default(0);
        $table->boolean('falta_olfato')->default(0);
        $table->boolean('dif_locomocao')->default(0);
        $table->boolean('diarreia')->default(0);

        $table->float('temperatura')->default(0);
        $table->integer('pa_sistolica')->default(0);
        $table->integer('pa_diastolica')->default(0);
        $table->integer('frq_respiratoria')->default(0);

        $table->timestamps();
    });
    }

    public function down(): void
    {
        Schema::dropIfExists('sintomas');
    }
};
