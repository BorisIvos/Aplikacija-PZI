export class JwtDataDto {
    role: "administrator" | "user";
    id: number;
    identity: string;
    exp: number; // UNIX TIMESTAMP
    ip: string;
    ua: string;

    toPlainObject() {
        return {
            role: this.role,
            id: this.id,
            username: this.identity,
            exp: this.exp,
            ip: this.ip,
            ua: this.ua
        }
    }
   
}