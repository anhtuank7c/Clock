import { Dimensions } from 'react-native';
import Colors from './Colors';

const { height } = Dimensions.get('window');

export default {
    container: {
        flex: 1,
        backgroundColor: Colors.containerColor,
    },
    timePickerStyle: {
        flexDirection: 'row',
        height: (height * 0.4),
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    remaintingContainerStyle: {
        height: (height * 0.4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerStyle: {
        alignItems: 'center',
    },
    pickerLabelStyle: {
        color: '#fff',
        fontSize: 18,
    },
    ringTonePickerStyle: {
        height: 40,
        backgroundColor: '#161616',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderTopWidth: 1,
        borderTopColor: '#272727',
        borderBottomWidth: 1,
        borderBottomColor: '#272727'
    },
    controlButtonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 30,
    },
    remaintingLabelStyle: {
        color: '#fff',
        fontSize: 50,
    },
    tabbarContainer: {
        height: 65,
        backgroundColor: Colors.tabbarColor,
        borderTopWidth: 1,
        borderTopColor: Colors.navbarBorderColor
    },
    navigationBarStyle: {
        backgroundColor: Colors.navbarColor,
        height: 65,
        borderBottomWidth: 1,
        borderBottomColor: Colors.navbarBorderColor,
    },
    navigationTitleStyle: {
        color: '#fff',
        fontSize: 18,
    },
    listViewStyle: {
        marginTop: 30,
        backgroundColor: Colors.listItemColor,
        borderTopWidth: 1,
        borderTopColor: Colors.navbarBorderColor,
        borderBottomWidth: 1,
        borderBottomColor: Colors.navbarBorderColor,
    },
    sceneStyle: {
        backgroundColor: Colors.containerColor,
        paddingTop: 65,
    },
    listItemIconContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        backgroundColor: Colors.listItemColor,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    listItemText: {
        color: Colors.listItemTextColor,
        fontSize: 16,
    },
    separator: {
        marginLeft: 40,
        borderBottomWidth: 1,
        borderBottomColor: Colors.navbarBorderColor
    },
    progressContainerStyle: {
    },
    progressBarContainerStyle: {
        borderWidth: 1,
    },
    progressBarContentStyle: {
        width: 0,
    },
    modalContainer: {
        backgroundColor: '#ccc',
        flex: 1
    },
    modalHeader: {
        backgroundColor: '#4caf50',
        height: 65,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        color: '#fff',
        fontSize: 18,
    },
    modalContent: {
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
