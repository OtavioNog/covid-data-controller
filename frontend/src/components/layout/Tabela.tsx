import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

import { FaArrowRight, FaTrashAlt, FaPen, FaEye } from 'react-icons/fa'

import './Tabela.css'
import { Link } from 'react-router-dom'

import axios from 'axios';
import { useEffect, useState } from 'react';


function Tabela() {

    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/pacientes/');
                setPacientes(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

function deletarPaciente() {
    console.log("VAMOOOOOOO")
}

    return (
        <div className='tabelaMain'>

            <Table className="table align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>CPF</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {pacientes.map((paciente: any) => (
                        <tr key={paciente.id} className='informacaoTbody'>
                            <th scope="row">{paciente.id}</th>
                            <td>{paciente.nome}</td>
                            <td>{paciente.nascimento}</td>
                            <td>{paciente.cpf}</td>

                            {paciente.status === "semdiagnostico" ? (
                                <td className='alertTable'><Alert variant="info">Não diagnosticado</Alert></td>
                            ) : paciente.status === "sintomas_insuficientes" ? (
                                <td className='alertTable'><Alert variant="success">Sintomas insuficientes</Alert></td>
                            ) : paciente.status === "potencial_infectado" ? (
                                <td className='alertTable'><Alert variant="warning">Potencial Infectado</Alert></td>
                            ) : paciente.status === "possivel_infectado" ? (
                                <td className='alertTable'><Alert variant="danger">Possível infectado</Alert></td>
                            ) : (
                                <td className='alertTable'><Alert variant="secondary">Dados indisponíveis</Alert></td>
                            )}

                            <td className='actions'>
                                <Link to="/info"><FaEye /></Link>
                                <Link to="/edit"><FaPen /></Link>
                                <Link to="#"><FaTrashAlt onClick={deletarPaciente} /></Link>
                                <Link to="/diagnostic"><FaArrowRight /></Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}

export default Tabela