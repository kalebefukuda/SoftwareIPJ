import express from "express"
import { sociedadeInterna } from "../app/controllers/SociedadeInternaController.js"

let router = express.Router()

router.get('/sociedade-interna', sociedadeInterna.all)
router.post('/sociedade-interna', sociedadeInterna.create)
router.put('/sociedade-interna/:id_sociedade_interna', sociedadeInterna.update)
router.delete('/sociedade-interna/:id_sociedade_interna', sociedadeInterna.delete)

export {router}