import { Request, Response } from "express";
import { User } from "../models/User";
import { Op, Sequelize } from "sequelize";
import { off } from "process";
import sharp from "sharp";
import { unlink } from "fs/promises";


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
            res.status(201);
            res.json({user})
        } else {
            res.json({error: 'E-mail já cadastrado'})
        }
    }
}

export const login = async (req: Request, res: Response) => {
    res.json({})
}

export const list = async (req: Request, res: Response) => {
    let list = await User.findAll();

    res.json({list})
}