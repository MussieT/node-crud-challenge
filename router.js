const controller = require('./controller')
const express = require('express')

const router = express.Router()

router.get("/person", controller.allPeople)
router.get("/person/:id", controller.getPerson)
router.post('/person', controller.newPerson);
router.put('/person/:id', controller.updatePerson)
router.delete('/person/:id', controller.deletePerson)

module.exports = router;
