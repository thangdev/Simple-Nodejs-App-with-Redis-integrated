const express = require('express')
const fetch = require('node-fetch')
const redis = require('redis')

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379

const client = redis.createClient(REDIS_PORT)

const app = express();

const setResponse = (username, repoNum) => {
    return `<h2>User ${username} has ${repoNum} public repositories on Github</h2>`
}


// Make request to Github for data

const getRepos = async (req, res, next) => {
    try {
        console.log('Fetching data ....');
        const {username} = req.params;
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        const repoNum = data.public_repos;

        if(repoNum == undefined) {
            console.log("user not found!")
            return res.send('<h2>User not found !</h2>')
        }
        console.log("done fetching !")

        // Set data to Redis
        client.setex(username, 3600, repoNum)

        
        res.status(200).send(setResponse(username, repoNum))

    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({err: error})
    }
}

// Cache Middleware
const cache = (req, res, next) => {
    const {username} = req.params;
    client.get(username, (err, data) => {
        if(err) throw err
        if(data !== null) {
            res.send(setResponse(username, data))
        }
        else return next();
    })
}

app.get('/repos/:username',cache, getRepos);



app.listen(PORT, () => console.log('Server is running on port ' + PORT))