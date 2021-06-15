require('dotenv').config();

const express = require('express');
const axios   = require('axios');

// ### #####  ## # ## ###
// # Initializations... #
// ######## # # ## ######
const app = express();

//Puerto configurado en .env
const port = process.env.PORT;

app.all('/is_alive/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    console.log(`Method [${ req.method }] with params [${ JSON.stringify(req.query) }]`);

    const alive = {
        id: 0,
        alive: true,
        face: ':)'
    };

    res.write(JSON.stringify(alive));
    res.end();
});

app.get('/call_example/', async (req, res) => {
    try {
        params = {
            'param1': 'value_param1',
            'param2': -15235.86
        };
        const instance = axios.create({
            baseURL: `http://localhost:${ port }/is_alive`,
            params
        });

        const resp = await instance.post();

        res.writeHead(200, { 'Content-Type': 'application/json' });

        const resp_json = {
            id: 0,
            face: resp.data.face
        };

        res.write(JSON.stringify(resp_json));
        res.end();
    } catch (error) {
        console.log({error});
        res.writeHead(500, { 'Content-Type': 'application/json' });
        const resp_json = {
            id: -1,
            msg: `Error: [${error}]`
        };

        res.write(JSON.stringify(resp_json));
        res.end();
    }
})

app.all('*', (req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });

    not_found = {
        id: -1,
        msg: `404 | Context not found or not implemented yet [${ req.url }] for method [${ req.method }]`
    };

    res.write(JSON.stringify(not_found));
    res.end();
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${ port }`);
});
