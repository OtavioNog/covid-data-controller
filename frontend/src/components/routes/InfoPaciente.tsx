import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import './InfoPaciente.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';


interface pacienteData {
    id: number;
    status: string;
    nome: string;
    cpf: string;
    telefone: string;
    nascimento: string;
    perfil: string;
}

function InfoPaciente() {

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

    return (
        <div>
            <h1 className='h1Home'><span>Informações</span> do paciente</h1>
            <hr />


            <div className="col-md-12">
                <div className="divInfo">
                    {
                            <Card style={{ width: '25rem' }}>
                                <Card.Img variant="top" src="../../public/sxzj.jpeg" />
                                <Card.Body>
                                    <Card.Title>{paciente.nome}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Criado em 03/06/2023 às 10:06:27</Card.Subtitle><br></br>
                                    <div className="card-text">
                                        <p>Idade: {paciente.nascimento}</p>
                                        <p>Data de nascimento: {paciente.nascimento}</p>
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

            <div className="btnVoltar">
                <Link to="/"><FaArrowLeft /></Link>
            </div>
        </div>
    )
}

export default InfoPaciente