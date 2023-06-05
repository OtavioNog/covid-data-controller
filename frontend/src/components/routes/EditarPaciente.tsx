import './EditarPaciente.css';

import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Carousel, Container } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import axios from 'axios';

import CpfValidado from '../misc/CpfValidado';
import MaskTelefone from '../misc/MaskTelefone';

interface pacienteData {
  id: number;
  status: string;
  nome: string;
  cpf: string;
  telefone: string;
  nascimento: string;
  perfil: string;
}


function EditarPaciente() {

  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<pacienteData | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

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



  const renderForms = () => {
    if (activeIndex === 0) {
      return (
        <div>
          <h3>Atualizar dados:</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control type="text" placeholder={paciente.nome} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control type="date" value={paciente.nascimento} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <CpfValidado value={paciente.cpf} disabled={false} validacao={true} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <MaskTelefone value={paciente.telefone} disabled={false} />

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto do Paciente</Form.Label>
              <Form.Control type="file" accept='.jpg, .jpeg, .png' />
            </Form.Group>

            <Button variant="dark" type="submit">
              Finalizar alterações
            </Button>
          </Form>
        </div>
      );
    } else if (activeIndex === 1) {
      return (
        <div>
          <h3>Atualizar sintomas:</h3>
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
        </div>
      );
    }
  };

  return (
    <div>
      <h1 className='h1Home'><span>Editar</span> informações de "{paciente.nome}"</h1>
      <hr />
      <br></br>

      <div className="row">
        <div className="col-md-6">
          <h3>Pré-Visualização</h3>
          <div className="divInfo">
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" src="../../public/sxzj.jpeg" />
              <Card.Body>
                <Card.Title>{paciente.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Criado em 03/06/2023 às 10:06:27</Card.Subtitle><br></br>

                <div className="card-text">
                  <p>Idade: 17 anos</p>
                  <p>Data de nascimento: {paciente.nascimento}</p>
                  <p>CPF: {paciente.cpf}</p>
                  <p>Telefone: {paciente.telefone}</p>
                </div>

              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="col-md-6">
          <Container>
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null} className="custom-carousel">
              <Carousel.Item>
                {renderForms()}
              </Carousel.Item>
              <Carousel.Item>
                {renderForms()}
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>

      </div>
      <div className="btnVoltar">
        <Link to="/"><FaArrowLeft /></Link>
      </div>
    </div>
  )
}

export default EditarPaciente