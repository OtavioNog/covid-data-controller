import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './DiagnosticoPaciente.css';

interface pacienteData {
    id: number;
    status: string;
    nome: string;
    cpf: string;
    telefone: string;
    nascimento: string;
    perfil: string;
}

function DiagnosticoPaciente() {

    const navigate = useNavigate();

    const [dadosSaude, setDadosSaude] = useState({
        temperatura: '',
        pressaoSistolica: '',
        pressaoDiastolica: '',
        frequenciaRespiratoria: '',
    });

    const [sintomas, setSintomas] = useState({
        febre: false,
        coriza: false,
        narizentupido: false,
        cansaco: false,
        tosse: false,
        dorcabeca: false,
        dorcorpo: false,
        malestar: false,
        dorgarganta: false,
        dificuldaderespirar: false,
        faltapaladar: false,
        faltaolfato: false,
        dificuldadelocomocao: false,
        diarreia: false,
    });



    const handleEnviarDadosSaude = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const quantidadeSintomas = Object.values(sintomas).filter((value) => value).length;

        let novoStatus = '';

        if (quantidadeSintomas >= 0 && quantidadeSintomas <= 6) {
            novoStatus = 'sintomas_insuficientes';
        } else if (quantidadeSintomas >= 7 && quantidadeSintomas <= 9) {
            novoStatus = 'potencial_infectado';
        } else {
            novoStatus = 'possivel_infectado';
        }

        axios.post('http://localhost:8000/api/diagnostico', {
            pacienteId: id,
            temperatura: dadosSaude.temperatura,
            pressaoSistolica: dadosSaude.pressaoSistolica,
            pressaoDiastolica: dadosSaude.pressaoDiastolica,
            frequenciaRespiratoria: dadosSaude.frequenciaRespiratoria,
            ...sintomas,
        })
            .then(() => {

                axios.patch(`http://localhost:8000/api/pacientes/${id}`, {
                    status: novoStatus,
                })
                    .then(() => {
                        navigate('/');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const { id } = useParams<{ id: string }>();
    const [paciente, setPaciente] = useState<pacienteData | null>(null);

    useEffect(() => {

        axios.get(`http://localhost:8000/api/pacientes/${id}`)
            .then(response => {
                setPaciente(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    if (!paciente) {
        return (
            <Alert className='alertCenter' variant="secondary">
                <p>Não há dados para serem exibidos! :&#40;</p>
            </Alert>
        )
    }

    if (paciente.status !== 'semdiagnostico') {
        return (
            <>
                <Alert className='alertCenter' variant="warning" style={{ width: '100%' }}>
                    <p>Você não pode realizar outro diagnóstico. Para editar seu diagnóstico, vá até a página de edição para realizar as alterações que estiverem pendentes!</p>
                </Alert>
                <div className="btnVoltar">
                    <Link to="/"><FaArrowLeft /></Link>
                </div>
            </>
        );
    }


    return (
        <div>
            <h1 className='h1Home'><span>Diagnosticar</span> {paciente.nome}</h1>
            <hr />
            <br></br>

            <div className="row">
                <h3>Informações do paciente:</h3>

                <div className="col-md-6">

                    <Form.Group className="mb-3">
                        <Form.Label>Nome completo</Form.Label>
                        <Form.Control disabled type="text" value={paciente.nome} readOnly />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Nascimento</Form.Label>
                        <Form.Control disabled type="date" value={paciente.nascimento} readOnly />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control disabled type="text" value={paciente.cpf} readOnly />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control disabled type="text" value={paciente.telefone} readOnly />
                    </Form.Group>
                </div>


                <h3>Informe os dados que corresponderem ao estado do paciente:</h3><br></br>

                <div className="row">
                    <div className="col-md-6 diagnosticoDadosSaude">
                        <Card style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title>Saúde</Card.Title>
                                <br></br>
                                <div className='Card-text'>

                                    <Form id='formDados' onSubmit={handleEnviarDadosSaude}>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Temperatura:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Inserir temperatura"
                                                value={dadosSaude.temperatura}
                                                onChange={(e) => setDadosSaude({ ...dadosSaude, temperatura: e.target.value })}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Pressão arterial sistólica:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Inserir pressão sistólica"
                                                value={dadosSaude.pressaoSistolica}
                                                onChange={(e) => setDadosSaude({ ...dadosSaude, pressaoSistolica: e.target.value })}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Pressão arterial diastólica:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Inserir pressão diastólica"
                                                value={dadosSaude.pressaoDiastolica}
                                                onChange={(e) => setDadosSaude({ ...dadosSaude, pressaoDiastolica: e.target.value })}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Frequência respiratória:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Inserir frequência respiratória"
                                                value={dadosSaude.frequenciaRespiratoria}
                                                onChange={(e) => setDadosSaude({ ...dadosSaude, frequenciaRespiratoria: e.target.value })}
                                                required
                                            />
                                        </Form.Group>

                                        <Button variant="dark" type="submit">
                                            Inserir dados
                                        </Button>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-6 diagnosticoSintomas">
                        <Card style={{ width: '25rem' }}>
                            <Card.Body>
                                <div className='Card-text'>
                                    <Form id='formDados' onSubmit={handleEnviarDadosSaude}>
                                        <Card.Title>Sintomas</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Pode-se não ter sintomas no começo.</Card.Subtitle><br></br>

                                        <Form.Check
                                            type="switch"
                                            id="febre"
                                            label="Febre"
                                            checked={sintomas.febre}
                                            onChange={(e) => setSintomas({ ...sintomas, febre: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="coriza"
                                            label="Coriza"
                                            checked={sintomas.coriza}
                                            onChange={(e) => setSintomas({ ...sintomas, coriza: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="narizentupido"
                                            label="Nariz Entupido"
                                            checked={sintomas.narizentupido}
                                            onChange={(e) => setSintomas({ ...sintomas, narizentupido: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="cansaco"
                                            label="Cansaço"
                                            checked={sintomas.cansaco}
                                            onChange={(e) => setSintomas({ ...sintomas, cansaco: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="tosse"
                                            label="Tosse"
                                            checked={sintomas.tosse}
                                            onChange={(e) => setSintomas({ ...sintomas, tosse: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="dorcabeca"
                                            label="Dor de cabeça"
                                            checked={sintomas.dorcabeca}
                                            onChange={(e) => setSintomas({ ...sintomas, dorcabeca: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="dorcorpo"
                                            label="Dores no corpo"
                                            checked={sintomas.dorcorpo}
                                            onChange={(e) => setSintomas({ ...sintomas, dorcorpo: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="malestar"
                                            label="Mal estar geral"
                                            checked={sintomas.malestar}
                                            onChange={(e) => setSintomas({ ...sintomas, malestar: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="dorgarganta"
                                            label="Dor de garganta"
                                            checked={sintomas.dorgarganta}
                                            onChange={(e) => setSintomas({ ...sintomas, dorgarganta: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="dificuldaderespirar"
                                            label="Dificuldade para respirar"
                                            checked={sintomas.dificuldaderespirar}
                                            onChange={(e) => setSintomas({ ...sintomas, dificuldaderespirar: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="faltapaladar"
                                            label="Falta de paladar"
                                            checked={sintomas.faltapaladar}
                                            onChange={(e) => setSintomas({ ...sintomas, faltapaladar: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="faltaolfato"
                                            label="Falta de olfato"
                                            checked={sintomas.faltaolfato}
                                            onChange={(e) => setSintomas({ ...sintomas, faltaolfato: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="dificuldadelocomocao"
                                            label="Dificuldade de locomoção"
                                            checked={sintomas.dificuldadelocomocao}
                                            onChange={(e) => setSintomas({ ...sintomas, dificuldadelocomocao: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="diarreia"
                                            label="Diarréia"
                                            checked={sintomas.diarreia}
                                            onChange={(e) => setSintomas({ ...sintomas, diarreia: e.target.checked })}
                                        />
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

            </div>
            <div className="btnVoltar">
                <Link to="/"><FaArrowLeft /></Link>
            </div>
        </div>
    )
}

export default DiagnosticoPaciente