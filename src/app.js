const chalk = require('chalk');
const express = require('express');

// Create an instance of an Express app
const app = express();

/*
*call back req is http request, res is http response
*/

app.get('',(req, res) => {
    console.log(chalk.yellow('Request made'));

    // send a response back
    res.send(`Hello from NodeJs rendered at ${new Date()}`);
    
});

app.get('/page2', (req, res) =>{
    console.log('Requested page 2');
    console.log(req.url);

    let html = `<h2>Hello from page 2. Rendered at ${new Date()}</h2>
                <p><a href="/">Home</a></p>
    `;

    res.send(html);
    
})

//Start the web server
app.listen(3000, () => {
    console.log(chalk.green(`Express server listening at http://localhost:3000 pid ${process.pid}`));
    
});