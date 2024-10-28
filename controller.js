const { v4: uuidv4 } = require('uuid');
const persons = require('./persons')

//TODO: Implement crud of person
const allPeople = (req, res) => {
    res.status(200).json(persons)
}

const getPerson = (req, res) => {
    try {
        const person = persons.find(p => p.id === req.params.id);

        if (!person) {
            return res.status(404).json({ message: "PersonDoesntExist"});
        }
    
        res.status(200).json(person);
    } catch (e) {
        return e
    }
}

// Create a new person
const newPerson = (req, res) => {
    try {
        const { name, age, hobbies } = req.body || {};

        // Required fields
        if (!name || typeof age !== "number" || !Array.isArray(hobbies)) {
            return res.status(400).send();
        }
    
        // Empty body check
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send();
        }
    
        const newPerson = { id: uuidv4(), ...req.body };
        persons.push(newPerson);
        res.status(200).json(newPerson);
    } catch (e) {
        return res.status(500).json({ 
            error: 'Internal Server Error', 
            message: e.message || 'An unexpected error occurred' 
        });
    }
}

const updatePerson = (req, res) => {    
    let newUser = {
        id: String(req.params.id),
        ...req.body
    }

    // Find by id
    const index = persons.findIndex(p => p.id == newUser.id);

    if (index == -1) {
        return res.status(404).send()
    }

    // update it if id found
    persons[index] = newUser

    res.status(200).send()
}

const deletePerson =  (req, res) => {
    // Find by id
    const index = persons.findIndex(p => p.id == req.params.id);

    if (index == -1) {
        return res.status(404).send()
    }

    persons.splice(index, 1)
    res.status(200).send()
}

module.exports = {
    allPeople,
    getPerson,
    newPerson,
    updatePerson,
    deletePerson
};
