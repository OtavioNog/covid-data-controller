import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import './InfoPaciente.css';
import 'bootstrap/dist/css/bootstrap.css';
import {FaArrowLeft} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function InfoPaciente() {
    return (
        <div>
            <h1 className='h1Home'><span>Informações</span> do paciente</h1>
            <hr />


            <div className="col-md-12">
                <div className="divInfo">
                    <Card style={{ width: '25rem' }}>
                        <Card.Img variant="top" src="../../public/sxzj.jpeg" />
                        <Card.Body>
                            <Card.Title>Pedro Otavio Nogueira Pinheiro</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Criado em 03/06/2023 às 10:06:27</Card.Subtitle><br></br>
                            <div className="card-text">
                                <p>Idade: 17 anos</p>
                                <p>Data de nascimento: 22/12/2005</p>
                                <p>CPF: 000.000.000-00</p>
                                <p>Telefone: (00) 00000-0000</p><br></br>
                                <Alert className='alertCenter' variant="info">
                                 <p>Não diagnosticado</p>
                                </Alert>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <div className="btnVoltar">
               <Link to="/"><FaArrowLeft /></Link> 
            </div>
        </div>
    )
}

export default InfoPaciente