import {Request, Response, NextFunction} from 'express';

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        //Aqui faço as funções de verificaçao como BASIC AUTH, JWT, etc... que aprenderemos mais a frente

        let success: boolean = false;

        if (success) {
            next();
        } else {
            res.status(403) // Not authorized
            res.json({ error: 'Login não autorizado' })
        }
    }
}