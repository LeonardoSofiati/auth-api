import { Request, Response } from "express";
import { User } from "../models/User";
import { Op, Sequelize } from "sequelize";
import { off } from "process";
import sharp from "sharp";
import { unlink } from "fs/promises";
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()


export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let {email, password} = req.body;

        let [user, created] = await User.findOrCreate({
            where: {email: email},
            defaults: {
                email: email,
                password: password
            }
        });
        if(created) {
            const token = JWT.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn: '2h'}
            );

            res.status(201);
            res.json({user, token})
        } else {
            res.json({error: 'E-mail já cadastrado'})
        }
    }
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let {email, password} = req.body;

        let user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });

        if (user) {
            const token = JWT.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn: '2h'}
            );

            res.json({status: true, token})
        } else {
            res.json({status: false})
        }

    } else {
        res.json({error: 'E-mail ou senha não inseridos'});
    }
}

export const list = async (req: Request, res: Response) => {
    let list = await User.findAll();

    res.json({list})
}