import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import './InfoPaciente.css';
import axios from 'axios';

interface pacienteData {
    id: number;
    status: string;
    nome: string;
    cpf: string;
    telefone: string;
    nascimento: string;
    perfil: string;
    created_at: string;
}

interface dadosSaude {
    temperatura: number;
    pa_sistolica: number;
    pa_diastolica: number;
    frq_respiratoria: number;
    sintomas: any;
}

function InfoPaciente() {
    const { id } = useParams<{ id: string }>();
    const [paciente, setPaciente] = useState<pacienteData | null>(null);
    const [diagnostico, setDiagnostico] = useState<dadosSaude | null>(null);

    // Idade em anos

    function idadeAnos(nascimento: string): number {
        const dataAtual = new Date();
        const anoNascimento = new Date(nascimento);

        let idade = dataAtual.getFullYear() - anoNascimento.getFullYear();
        const diferencaMeses = dataAtual.getMonth() - anoNascimento.getMonth();

        if (
            diferencaMeses < 0 ||
            (diferencaMeses === 0 && dataAtual.getDate() < anoNascimento.getDate())
        ) {
            idade--;
        }

        return idade;
    }

    useEffect(() => {

        axios.get(`http://localhost:8000/api/pacientes/${id}`)
            .then(response => {
                setPaciente(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`http://localhost:8000/api/diagnostico/${id}`)
            .then(response => {
                setDiagnostico(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);





    if (!paciente) {
        return (
            <Alert className='alertCenter' variant="secondary">
                <p>Não há dados para serem exibidos! :&#40;</p>
            </Alert>
        )
    }

    return (
        <div>
            <h1 className='h1Home'><span>Informações</span> do paciente</h1>
            <hr />
            <div className="row">
                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="divInfo">
                        {
                            <Card style={{ width: '25rem' }}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:8000/api/${paciente.perfil}`}
                                    className={`status-${paciente.status}`}
                                />


                                <Card.Body>
                                    <Card.Title>{paciente.nome}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Criado em: {format(new Date(paciente.created_at), 'dd/MM/yyyy HH:mm:ss')}</Card.Subtitle><br></br>
                                    <div className="card-text">
                                        <p>Nasceu em: {format(parseISO(paciente.nascimento), 'dd/MM/yyyy')}</p>
                                        <p>Idade: {idadeAnos(paciente.nascimento)} anos</p>
                                        <p>CPF: {paciente.cpf}</p>
                                        <p>Telefone: {paciente.telefone}</p><br></br>

                                        {paciente.status === "semdiagnostico" ? (
                                            <Alert className='alertCenter' variant="info">
                                                <p>Sem diagnostico</p>
                                            </Alert>
                                        ) : paciente.status === "sintomas_insuficientes" ? (
                                            <Alert className='alertCenter' variant="success">
                                                <p>Sintomas insuficientes</p>
                                            </Alert>
                                        ) : paciente.status === "potencial_infectado" ? (
                                            <Alert className='alertCenter' variant="warning">
                                                <p>Potencial infectado</p>
                                            </Alert>
                                        ) : paciente.status === "possivel_infectado" ? (
                                            <Alert className='alertCenter' variant="danger">
                                                <p>Possível infectado</p>
                                            </Alert>
                                        ) : (
                                            <p className='alertTable'><Alert variant="secondary">Dados indisponíveis</Alert></p>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        }
                    </div>
                </div>

                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'end' }}>
                    <div className="divInfo">

                        {paciente.status === "semdiagnostico" ? (
                            <Card style={{ width: '25rem' }}>
                                <Card.Body>
                                    <Card.Title>Dados de saúde</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Coletados após a realização do diagnóstico do mesmo</Card.Subtitle><br></br>
                                    <div className="card-text">
                                        <Alert className='alertCenter' variant="warning">
                                            <p>Os dados de saúde estão indisponíveis, provavelmente você ainda não foi diagnosticado!</p>
                                        </Alert>
                                    </div>
                                </Card.Body>
                            </Card>
                        ) : (
                            diagnostico !== null ? (
                                <Card style={{ width: '25rem' }}>
                                    <Card.Body>
                                        <Card.Title>Dados de saúde:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Coletados após a realização do diagnóstico do mesmo</Card.Subtitle><br></br>
                                        <div className="card-text">
                                            {diagnostico.sintomas.temperatura >= 40 ? (
                                                <Alert variant="danger">
                                                    <p>Temperatura: {diagnostico.sintomas.temperatura} graus - risco de hipertermia</p>
                                                </Alert>
                                            ) : diagnostico.sintomas.temperatura > 37.3 && diagnostico.sintomas.temperatura < 40 ? (
                                                <Alert variant="warning">
                                                    <p>Temperatura: {diagnostico.sintomas.temperatura} graus - febril/subfebril</p>
                                                </Alert>

                                            ) : diagnostico.sintomas.temperatura < 36 ? (
                                                <Alert variant="primary">
                                                    <p>Temperatura: {diagnostico.sintomas.temperatura} graus - risco de hipotermia</p>
                                                </Alert>

                                            ) : (
                                                <Alert variant="secondary">
                                                    <p>Temperatura: {diagnostico && diagnostico.sintomas.temperatura ? diagnostico.sintomas.temperatura : 'N/A'} graus - normotermia</p>
                                                </Alert>
                                            )}

                                            <Alert variant="secondary">Pressão arterial: {diagnostico && diagnostico.sintomas.pa_sistolica && diagnostico.sintomas.pa_diastolica ? `${diagnostico.sintomas.pa_sistolica}x${diagnostico.sintomas.pa_diastolica} mmHG` : 'N/A'}</Alert>

                                            {diagnostico.sintomas.frq_respiratoria < 12 ? (
                                                <Alert variant="primary">
                                                    <p>Frequência respiratória baixa: {diagnostico.sintomas.frq_respiratoria} rpm</p>
                                                </Alert>
                                            ) : diagnostico.sintomas.frq_respiratoria >= 12 && diagnostico.sintomas.frq_respiratoria <= 20 ? (
                                                <Alert variant="secondary">
                                                    <p>Frequência respiratória normal: {diagnostico.sintomas.frq_respiratoria} rpm</p>
                                                </Alert>
                                            ) : diagnostico.sintomas.frq_respiratoria > 20 ? (
                                                <Alert variant="danger">
                                                    <p>Frequência respiratória alta: {diagnostico.sintomas.frq_respiratoria} rpm</p>
                                                </Alert>
                                            ) : (
                                                <Alert variant="secondary">
                                                    <p>Frequência respiratória: {diagnostico && diagnostico.sintomas.frq_respiratoria ? diagnostico.sintomas.frq_respiratoria : 'N/A'} rpm</p>
                                                </Alert>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <Alert className='alertCenter' variant="secondary">
                                    <p>Dados de diagnóstico não disponíveis.</p>
                                </Alert>
                            )
                        )}

                    </div>
                </div>
            </div>


            <div className="btnVoltar">
                <Link to="/"><FaArrowLeft /></Link>
            </div>
        </div>
    )
}

export default InfoPaciente