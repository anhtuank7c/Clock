import React, { Component } from 'react';
import { Provider } from 'react-redux';
import CodePush from 'react-native-code-push';
import store from './config/store';
import Router from './Router';
import { Modal, Progress } from './components/common';

class App extends Component {
    state = {
        showDownloadingModal: false,
        showInstallingModal: false,
        downloadProgress: 0
    }

    componentDidMount() {
        CodePush.sync({
            updateDialog: true,
            installMode: CodePush.InstallMode.IMMEDIATE,
        }, (status) => {
            switch (status) {
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    this.setState({ showDownloadingModal: true });
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    this.setState({ showInstallingModal: true });
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                    break;
                default:
                    break;
            }
        }, ({ receivedBytes, totalBytes }) => {
            this.setState({ downloadProgress: Math.round((receivedBytes / totalBytes) * 100) });
        });
    }

    render() {
        if (this.state.showDownloadingModal) {
            if (this.state.showInstallingModal) {
                return (
                    <Modal title="Installing" content="Installing update...">
                        <Progress progressed={this.state.downloadProgress} />
                    </Modal>
                );
            }
            return (
                <Modal title="Update" content="Updating application...">
                    <Progress progressed={this.state.downloadProgress} />
                </Modal>
            );
        }
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
