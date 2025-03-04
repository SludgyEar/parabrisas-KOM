import {useState} from 'react';
import { createPortal } from 'react-dom';
import Importar from './Importar';

export default function ImportarPortal() {
    const [showModal, setShowModal] = useState(false);
    return(
        <>
            <button onClick={() => setShowModal(true)}>
                Importar
            </button>
            {showModal && createPortal(
                <Importar onClose={() => setShowModal(false)}/>,
                document.getElementById('navegationContainer')
            )}
        </>
    );
}