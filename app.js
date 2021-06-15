require('dotenv').config();

const express = require('express');
const axios   = require('axios');

// ### #####  ## # ## ###
// # Initializations... #
// ######## # # ## ######
const app = express();

//Puerto configurado en .env
const port = process.env.PORT;

app.all('/', (req, res) => {
    console.log(`Method [${ req.method }] with params ` +
        `[${ JSON.stringify(req.query) }]`);

    res.set('content-type', 'application/json');
    res.send({
        id: 0,
        msg: 'Welcome back my friend to the show that never ends...',
        face: ':)'
    });
});

app.get('/call_example/', async (req, res) => {
    try {
        params = {
            'param1': 'value_param1',
            'param2': -15235.86
        };
        const instance = axios.create({
            baseURL: `http://localhost:${ port }/`,
            params
        });

        const resp = await instance.post();

        const resp_json = {
            id: 0,
            face: resp.data.face
        };

        res.set('content-type', 'application/json');
        res.send(resp_json);
    } catch (error) {
        console.log({error});
        const resp_json = {
            id: -1,
            msg: `Error: [${error}]`
        };

        res.set('content-type', 'application/json');
        res.send(resp_json);
    }
})

app.all('*', (req, res) => {
    res.set('content-type', 'application/json');
    res.send({
        id: -1,
        msg: `404 | Context [${ req.url }] not found or not ` +
             `implemented yet for method [${ req.method }]`
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${ port }`);
});
