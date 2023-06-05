import './DiagnosticoPaciente.css';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import {FaArrowLeft} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function DiagnosticoPaciente() {
    return (
        <div>
            <h1 className='h1Home'><span>Diagnosticar</span> paciente Pedro Otavio Nogueira Pinheiro</h1>
            <hr />
            <br></br>

            <div className="row">
                    <h3>Informações do paciente:</h3>

                <div className="col-md-6">
                <Form.Group className="mb-3">
                    <Form.Label>Nome completo</Form.Label>
                    <Form.Control disabled type="text" value="Pedro Otavio Nogueira Pinheiro" />
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group className="mb-3">
                    <Form.Label>Nascimento</Form.Label>
                    <Form.Control disabled type="date" value="2005-12-22"/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group className="mb-3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control disabled type="text" value="111.222.333-44"/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control disabled type="text" value="(00) 00000-0000"/>
                </Form.Group>
                </div>

                <h3>Informe os dados que corresponderem ao estado do paciente:</h3><br></br>

                <div className="col-md-6">
                    <div className="diagnosticoDadosSaude">
                        <Card style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title>Saúde</Card.Title>
                                <br></br>
                                <Card.Text>
                                    <Form id='formDados'>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Temperatura:</Form.Label>
                                            <Form.Control type="number" placeholder="Inserir temperatura" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Pressão arterial sistólica:</Form.Label>
                                            <Form.Control type="number" placeholder="Inserir pressão sistólica" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Pressão arterial diastólica:</Form.Label>
                                            <Form.Control type="number" placeholder="Inserir pressão diastólica" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Frequência respiratória:</Form.Label>
                                            <Form.Control type="number" placeholder="Inserir frequência respiratória" />
                                        </Form.Group>

                                        <Button variant="success" type="submit">
                                            Inserir dados
                                        </Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="diagnosticoSintomas">
                        <Card style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title>Sintomas</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Pode-se não ter sintomas no começo.</Card.Subtitle><br></br>
                                <Card.Text>
                                    <Form id='formSintomas'>
                                        <Form.Check type="switch" id="febre" label="Febre" />
                                        <Form.Check type="switch" id="coriza" label="Coriza" />
                                        <Form.Check type="switch" id="narizentupido" label="Nariz Entupido" />
                                        <Form.Check type="switch" id="cansaco" label="Cansaço" />
                                        <Form.Check type="switch" id="tosse" label="Tosse" />
                                        <Form.Check type="switch" id="dorcabeca" label="Dor de cabeça" />
                                        <Form.Check type="switch" id="dorcorpo" label="Dores no corpo" />
                                        <Form.Check type="switch" id="malestar" label="Mal estar geral" />
                                        <Form.Check type="switch" id="dorgarganta" label="Dor de garganta" />
                                        <Form.Check type="switch" id="dificuldaderespirar" label="Dificuldade para respirar" />
                                        <Form.Check type="switch" id="faltapaladar" label="Falta de paladar" />
                                        <Form.Check type="switch" id="faltaolfato" label="Falta de olfato" />
                                        <Form.Check type="switch" id="dificuldadelocomocao" label="Dificuldade de locomoção" />
                                        <Form.Check type="switch" id="diarreia" label="Diarréia" />      
                                    </Form>
                                </Card.Text>
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