<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable()->default('semdiagnostico');;
            $table->string('nome');
            $table->string('cpf', 15)->unique();
            $table->string('telefone', 15);
            $table->date('nascimento');
            $table->string('perfil');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pacientes');
    }
};