import { Request, Response, NextFunction } from "express";


export const getHeroesList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	res.status(200).json([]);

};

export const addHero = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const hero = {
		id: 0,
		name: req.body.name,
		weapons: req.body.weapons,
		strengths: req.body.strengths
	};


	res.status(201).json(hero);

};

export const updateHero = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const hero = {
		id: parseInt(req.params.id),
		name: req.body.name,
		weapons: req.body.weapons,
		strengths: req.body.strength
	};

	res.status(200).json(hero);

};

export const deleteHero = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { id } = req.params;

	res.status(200).json({id});


};

