import React, { PropTypes, Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Styles from '../../constant/Styles';

const propTypes = {
    children: PropTypes.object,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};
class Modal extends Component {
    state = {
        isOpen: true
    }

    render() {
        const { modalContainer, modalHeader, modalTitle, modalContent } = Styles;
        const { title, content, children, onClose } = this.props;
        return (
            <View style={modalContainer}>
                <View style={modalHeader}>
                    <Text style={modalTitle}>{title}</Text>
                    {onClose &&
                        <TouchableWithoutFeedback onPress={onClose}>
                            <Ionicons name="ios-close-empty" size="large" />
                        </TouchableWithoutFeedback>
                    }
                </View>
                <View style={modalContent}>
                    <Text style={{ marginBottom: 20 }}>{content}</Text>
                    {children}
                </View>
            </View >
        );
    }
}

Modal.propTypes = propTypes;
export { Modal };
