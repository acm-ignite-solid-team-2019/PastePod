import React from 'react'
import Modal from 'react-responsive-modal';
import { ProviderLogin } from '@inrupt/solid-react-components';

import '../style/Login.css'

class Login extends React.Component {
    state = {
        open: false
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div className="Login">
                <button onClick={this.onOpenModal}>Login</button>

                <Modal open={open} onClose={this.onCloseModal} focusTrapped>
                    <ProviderLogin callbackUri={`${window.location.origin}`}/>
                </Modal>
            </div>
        );
    }
}

export default Login;