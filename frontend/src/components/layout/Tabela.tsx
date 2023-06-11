import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaArrowRight, FaTrashAlt, FaPen, FaEye } from 'react-icons/fa';
import './Tabela.css';

interface Paciente {
  id: number;
  nome: string;
  nascimento: string;
  cpf: string;
  status: string;
}

function Tabela() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Paciente[]>('http://localhost:8000/api/pacientes/');
        setPacientes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const deletarPaciente = async (id: number) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este paciente?');

    if (confirmacao) {
      try {
        await axios.delete(`http://localhost:8000/api/pacientes/${id}`);
        const response = await axios.get<Paciente[]>('http://localhost:8000/api/pacientes/');
        setPacientes(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

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

  const filtrarPacientes = (status: string) => {
    setFiltroStatus(status);
  };

  const ordenarPacientes = (pacientes: Paciente[]): Paciente[] => {
    if (filtroStatus === 'nao_diagnosticado') {
      return pacientes.filter((paciente) => paciente.status === 'semdiagnostico');
    }

    return pacientes;
  };

  return (
    <div className='tabelaMain'>
      <DropdownButton id='dropdown-filtroStatus' title='Filtrar' variant='dark' style={{marginBottom: '20px'}}>
        <Dropdown.Item onClick={() => filtrarPacientes('')}>Todos</Dropdown.Item>
        <Dropdown.Item onClick={() => filtrarPacientes('nao_diagnosticado')}>
          Não diagnosticado
        </Dropdown.Item>
      </DropdownButton>

      {pacientes.length === 0 ? (
        <Alert variant='info' style={{marginTop: '50px'}}>Não há registros no banco de dados. Por favor, realizar novos cadastros.</Alert>
      ) : (
        <Table className='table align-middle'>
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
          <tbody className='table-group-divider'>
            {ordenarPacientes(pacientes).map((paciente: Paciente, identificacao: number) => (
              <tr key={paciente.id} className='informacaoTbody'>
                <th scope='row'>{identificacao + 1}</th>
                <td>{paciente.nome}</td>
                <td>{idadeAnos(paciente.nascimento)} anos</td>
                <td>{paciente.cpf}</td>

                {paciente.status === 'semdiagnostico' ? (
                  <td className='alertTable'>
                    <Alert variant='info' style={{ width: '20vh' }}>
                      Não diagnosticado
                    </Alert>
                  </td>
                ) : paciente.status === 'sintomas_insuficientes' ? (
                  <td className='alertTable'>
                    <Alert variant='success' style={{ width: '20vh' }}>
                      Sintomas insuficientes
                    </Alert>
                  </td>
                ) : paciente.status === 'potencial_infectado' ? (
                  <td className='alertTable'>
                    <Alert variant='warning' style={{ width: '20vh' }}>
                      Potencial Infectado
                    </Alert>
                  </td>
                ) : paciente.status === 'possivel_infectado' ? (
                  <td className='alertTable'>
                    <Alert variant='danger' style={{ width: '20vh' }}>
                      Possível infectado
                    </Alert>
                  </td>
                ) : (
                  <td className='alertTable'>
                    <Alert variant='secondary'>Dados indisponíveis</Alert>
                  </td>
                )}

                <td className='actions'>
                  <Link to={`/info/${paciente.id}`}>
                    <FaEye />
                  </Link>
                  <Link to={`/edit/${paciente.id}`}>
                    <FaPen />
                  </Link>
                  <Link to='#' onClick={() => deletarPaciente(paciente.id)}>
                    <FaTrashAlt />
                  </Link>
                  <Link to={`/diagnostic/${paciente.id}`}>
                    <FaArrowRight />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Tabela;
