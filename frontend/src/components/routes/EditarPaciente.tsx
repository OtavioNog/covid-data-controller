import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { FaArrowLeft } from 'react-icons/fa';
import { Card, Button, Form, Alert, Carousel, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './EditarPaciente.css';
import { format, parseISO } from 'date-fns';

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

function EditarPaciente() {

  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<pacienteData | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

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
          <h3>Atualizar dados: ~Em desenvolvimento!~</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control type="text" placeholder={paciente.nome} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control type="date" value={paciente.nascimento} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                as={IMaskInput}
                type="text"
                name="cpf"
                value={paciente.cpf}
                required
                mask="000.000.000-00"
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                as={IMaskInput}
                type="text"
                name="telefone"
                value={paciente.telefone}
                required
                mask="(00) 00000-0000"
                readOnly
              />
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
      if (paciente.status === "semdiagnostico") {

        return (
          <div>
            <h3>Atualizar sintomas:</h3>
            <Alert variant="warning">
              Não é possível realizar estas alterações sem estar diagnosticado, faça um diagnóstico antes!
            </Alert>
          </div>
        );

      } else {

        return (
          <div>
            <h3>Atualizar sintomas:</h3>

            <Form id='formSintomas'>
              <Form.Check
                type="switch"
                id="febre"
                label="Febre"
              />
              <Form.Check
                type="switch"
                id="coriza"
                label="Coriza"
              />
              <Form.Check
                type="switch"
                id="narizentupido"
                label="Nariz Entupido"
              />
              <Form.Check
                type="switch"
                id="cansaco"
                label="Cansaço"
              />
              <Form.Check
                type="switch"
                id="tosse"
                label="Tosse"
              />
              <Form.Check
                type="switch"
                id="dorcabeca"
                label="Dor de cabeça"
              />
              <Form.Check
                type="switch"
                id="dorcorpo"
                label="Dores no corpo"
              />
              <Form.Check
                type="switch"
                id="malestar"
                label="Mal estar geral"
              />
              <Form.Check
                type="switch"
                id="dorgarganta"
                label="Dor de garganta"
              />
              <Form.Check
                type="switch"
                id="dificuldaderespirar"
                label="Dificuldade para respirar"
              />
              <Form.Check
                type="switch"
                id="faltapaladar"
                label="Falta de paladar"
              />
              <Form.Check
                type="switch"
                id="faltaolfato"
                label="Falta de olfato"
              />
              <Form.Check
                type="switch"
                id="dificuldadelocomocao"
                label="Dificuldade de locomoção"
              />
              <Form.Check
                type="switch"
                id="diarreia"
                label="Diarréia"
              />
              <Form.Text className="text-muted">
                Se deseja finalizar as alterações, pressione o botão na outra parte de edição.
              </Form.Text>
            </Form>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <h1 className='h1Home'><span>Editar</span> informações de {paciente.nome}</h1>
      <hr />
      <br></br>

      <div className="row">
        <div className="col-md-6">
          <h3>Pré-Visualização</h3>
          <div className="divInfo">
            <Card style={{ width: '20rem' }}>
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
                  <p>Telefone: {paciente.telefone}</p>
                  <div className="card-text">

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