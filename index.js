const express = require('express');
const typeorm = require('typeorm');
const User = require('./entity/user');

const app = express();
app.use(express.json())


const dataSource = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    database: "db",
    password: "pass",
    entities: ["entity/*.js"],
    synchronize: true
})


dataSource.initialize()
    .then(() => {
        console.log('Database Connected!');
    }).catch(function (error) {
    console.log("Error: ", error)
})

//http://localhost:3000/fill_data/title #done
app.get('/fill_data/:form_title', async (req, res) => {
    const title = req.params.form_title;
    const repo = await dataSource.getRepository(User);
    return res.json(await repo.findBy({title}));
});

//http://localhost:3000/form #done
app.post('/form', async (req, res) => {
    const reqBody = req.body;
    const repo = await dataSource.getRepository(User);
    const result = await repo.save(reqBody);
    return res.send(result)

})


app.post('/fill_data/:form_title', async (req, res) => {
    const title = req.params.form_title;
    const reqBody = req.body;
    const repo = await dataSource.getRepository(User);
    let temp = await repo.save(reqBody);
    temp.title = title;
    let result = await repo.save(result);
    return res.send(result)

})


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

