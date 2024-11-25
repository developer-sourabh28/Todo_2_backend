const express = require('express');
const router = express.Router();
const Todo = require('../schemas/TodoSchema');

router.post('/', async (req, res) => {
    try {
        const createTodo = new Todo ({
            title : req.body.title,
            description : req.body.description,
            status : req.body.status
        })

        const savedTodo = await createTodo.save();
        res.status(200).json(savedTodo)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

router.get('/', async (req, res) => {
    const {page = 1, limit = 3} = req.query;
    try {
        const getTodo = await Todo.find().skip((page - 1) * limit).limit(Number(limit));
        const totalItems = await Todo.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
        if(!getTodo){
            return res.status(404).json({message : 'Error in fetching todos'})
        }
        res.status(200).json({getTodo, totalItems, totalPages, CurrentPage: Number(page)});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
} );

router.get('/:id', async(req, res) => {
    try {
        const readById = await Todo.findById(req.params.id);
        if(!readById){
            return res.status(404).json({message : 'Cant find id'});
        }
        res.status(200).json(readById)
    } catch (error) {
        req.status(500).json({message : error.message})
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id , req.body, {new : true} )
        if(!updateTodo){
            return res.status(404).json({message : 'Todo not found on this id'})
        }
        res.status(200).json(updateTodo);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const delteTodo = await Todo.findByIdAndDelete(req.params.id);
        if(!delteTodo){
            return res.status(404).json('Todo not found for delete')
        }
        res.status(200).json({message : 'Todo deleted succesfully'})
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

module.exports = router;