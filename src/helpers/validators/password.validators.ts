export class PasswordValidator {

    // Expressão regular que verifica pelo menos 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais
    private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    public isValid(password: string): boolean {
        // Verifica se a senha segue os critérios de segurança
        return this.passwordRegex.test(password);
    }
}
