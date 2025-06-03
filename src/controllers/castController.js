import {Router} from "express"
import castService from "../services/castService.js";

const castController = Router();

castController.get('/create', (req, res)=> {
    res.render('cast/create'); //from the folder cast -> create
})

castController.post('/create', async (req, res)=> {
   const castData = req.body;

   // send to service?
   await castService.create(castData);
   
   res.redirect('/');
})

export default castController;