export class UsernameValidator {

    public isValid(username: string): boolean {
        // Verifica se o valor é nulo, vazio ou contém menos de 3 caracteres
        if (!username || username.trim().length < 3) {
            return false;
        }

        return true;
    }
}