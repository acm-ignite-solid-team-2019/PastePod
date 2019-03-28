import React from 'react'
import Modal from 'react-responsive-modal';
import { ProviderLogin } from '@inrupt/solid-react-components';

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
            <div className="login">
                <button onClick={this.onOpenModal}>Login</button>

                <Modal open={open} onClose={this.onCloseModal} focusTrapped>
                    <ProviderLogin/>
                </Modal>
            </div>
        );
    }
}

export default Login;