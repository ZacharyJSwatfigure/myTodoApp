const express = require('express');
const connection = require('./config');
// 3306
const PORT = process.env.PORT || 3001;
const app = express();
// turn on body-parser
// makes req.body exist
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// POST - create todo
// async await
// Declaring a function as "async" allows us to use "await" syntax inside of that function
app.post('/api/todos', async (req, res) => {
  // { task: 'Sleep' }
    const { task } = req.body;
  // If the user does not provide a task, respond with an error
    if(!task) {
    return res.status(400).json({ error: 'You must provide a task'});
    }
//  if there is a task save it to the database
//  JS will "try" to run every single line of code inside of the "try" block
//  if any lines of the code throws an error, JS will take that error and
//  put that error in the "catch" block, and then run the code in the "catch" block
    try {
  // many lines of code....
    const insertQuery = 'INSERT INTO todos(task) VALUES(?);';
    const getTodoById = 'SELECT * FROM todos WHERE id = ?;';
    const [result,] = await connection.query(insertQuery, [task,]);
    const [todosResult] = await connection.query(getTodoById, [result.insertId]);
    res.json(todosResult[0]);
    } catch (e) {
    res.status(400).json(e);
    }
});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
// [
//   {
//     "fieldCount": 0,
//     "affectedRows": 1,
//     "insertId": 1,
//     "info": "",
//     "serverStatus": 2,
//     "warningStatus": 0
//   },
//   null
// ]