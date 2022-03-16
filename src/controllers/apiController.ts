import { Request, Response } from "express";
import { User } from "../models/User";
import { Op, Sequelize } from "sequelize";
import { off } from "process";
import sharp from "sharp";
import { unlink } from "fs/promises";
import isEmail from "validator/lib/isEmail";


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
            res.json({user});
        } else {
            res.json({error: 'E-mail já cadastrado'});
        }
    } else {
        res.json({error: 'E-mail ou senha não enviados'});
    }
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let {email, password} = req.body

        let user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        })

        user ? res.json({status: true}) : res.json({status: false});

    } else {
        res.json({error:'E-mail ou senha não inseridos'})
    }
}

export const list = async (req: Request, res: Response) => {
    let list = await User.findAll();

    res.json({list})
}