import ERROR_MESSAGES from "../constants/error-messages";

const handleError = (error: any) => {
    if (error.response && error.response.data) {
        const { error: errorMessage } = error.response.data;

        if (errorMessage === ERROR_MESSAGES.duplicateEmail) {
            return ERROR_MESSAGES.duplicateEmail;
        }
        if (errorMessage === ERROR_MESSAGES.requiredFields) {
            return ERROR_MESSAGES.requiredFields;
        }
        if (errorMessage === ERROR_MESSAGES.duplicateIdentityNumber) {
            return ERROR_MESSAGES.duplicateIdentityNumber;
        }
        if (errorMessage === ERROR_MESSAGES.invalidCredentials) {
            return ERROR_MESSAGES.invalidCredentials;
        }
    }
    return 'Ocorreu um erro ao enviar o formulário.';
};

export { handleError }
