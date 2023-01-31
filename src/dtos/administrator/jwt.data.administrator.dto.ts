export class JwtDataAdministatorDto {
    administratorId: number;
    username: string;
    ext: number;
    ip: string;
    ua: string;

    toPlainObject(){
        return {
            administratorId: this.administratorId,
            username: this.username,
            ext: this.ext,
            ip: this.ip,
            ua: this.ua,
        }
    }

}