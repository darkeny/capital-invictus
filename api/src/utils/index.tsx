const generatePassword = (): string => {
    const length = 8; 
    const charset = "ab!@#$%c5678defghijklrstuvABCDEFGHI|}{[]:JKLMNOPQRSTUVWXYZ012mnopq3456789&*()_+~`;?,./-wxyz=";
    let password = "";

    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    return password;
};

export { generatePassword };
