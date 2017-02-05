jest.mock('Linking', () => {
    return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        openURL: jest.fn(),
        canOpenURL: jest.fn(),
        getInitialURL: jest.fn(),
    }
});
jest.mock('react-native-sound', () => ({
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
}));
jest.mock('react-native-code-push', () => ({
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
}));
