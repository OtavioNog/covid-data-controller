import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function ModalCadastro() {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [perfil, setPerfil] = useState<File | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('nascimento', dataNascimento);
    formData.append('cpf', cpf);
    formData.append('telefone', telefone);
    if (perfil) {
      formData.append('perfil', perfil);
    } else {
      formData.append('perfil', '');
    }

    try {
      await axios.post('http://localhost:8000/api/pacientes/', formData);
      window.location.reload();
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response?.data.errors;
        if (errors && errors.cpf) {
          alert('Ocorreu um erro ao cadastrar o paciente, este cpf é inválido. Por favor verificar os dados e tentar novamente!');
        }
      } else {
        alert('Ocorreu um erro ao cadastrar o paciente, provavelmente este CPF já foi utilizado. Por favor, inserir outro CPF!');
      }
    }

    handleClose();
  };

  return (
    <>
      <Button className='btnCadastrar' variant="dark" onClick={handleShow} style={{ marginBottom: '20px' }}>
        Cadastrar paciente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inserir dados do paciente:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Inserir nome completo..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                as={IMaskInput}
                type="text"
                name="cpf"
                value={cpf}
                onAccept={(value: string) => setCpf(value)}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                required
                mask="000.000.000-00"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                as={IMaskInput}
                type="text"
                name="telefone"
                value={telefone}
                onAccept={(value: string) => setTelefone(value)}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
                mask="(00) 00000-0000"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto do Paciente</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPerfil(file);
                  }
                }}
              />
              <Form.Text className="text-muted">
                É recomendado utilizar imagens com mesma altura e largura. (1:1)
              </Form.Text>
            </Form.Group>

            <Button variant="dark" type="submit">
              Finalizar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCadastro;
