import express from "express";

import rotasAlunos from "./alunosRoutes.js";
import rotasAuth from "./authRoutes.js"; 

const routes = (app) => {
    app.route("/").get( (req, res) => {
        res.status(200).json({"message": "Rota não específicada"});
    });
    app.use(express.json(), rotasAuth, rotasAlunos); 
};
export default routes;