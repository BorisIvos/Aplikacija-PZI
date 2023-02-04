import { JwtDataDto } from "src/dtos/jwt.data.dto";

declare module 'express'{
    interface Request{
        token: JwtDataDto;
    }
}