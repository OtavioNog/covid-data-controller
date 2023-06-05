import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './ModalCadastro.css'
import CpfValidado from '../misc/CpfValidado';
import MaskTelefone from '../misc/MaskTelefone';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='btnCadastrar' variant="dark" onClick={handleShow}>
        Cadastrar paciente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inserir dados do paciente:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control type="text" placeholder="Inserir nome completo..." />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <CpfValidado value="" disabled={false} validacao={true} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <MaskTelefone value="" disabled={false} />

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto do Paciente</Form.Label>
              <Form.Control type="file" accept='.jpg, .jpeg, .png' />
            </Form.Group>
            
            <Button variant="success" type="submit">
              Finalizar
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;