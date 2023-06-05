import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCadastro from '../layout/ModalCadastro';
import Tabela from '../layout/Tabela';

import './Home.css'

function Home() {
    return (
        <div>
            <h1 className='h1Home'>Últimos <span>Pacientes</span></h1>
            <hr />
            <ModalCadastro />

            <Tabela />
        </div>
    )
}

export default Home