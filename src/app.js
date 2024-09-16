const chalk = require('chalk');
const express = require('express');

// Create an instance of an Express app
const app = express();

//#region INtro


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
    
});


app.get('/count/:countupto/:startat', (req, res)=>{
    console.log(req.url);
    console.log(req.params);
    
    const start = parseInt(req.params.startat);
    const countTo = parseInt(req.params.countto);

    let html = countHtml(start, countTo);

    res.status(200).send(html);
    

});

app.get('/countv2', (req, res) =>{
    console.log(req.query);
    const start = parseInt(req.query.start);
    const countTo = parseInt(req.query.countto);

    let html = countHtml(start, countTo);

    res.status(200).send(html);
});

/**
 * Create an html unoredered list of numbers from a start position counting up to the provided value
 * @param {*} start - The start point for our numbers
 * @param {*} countTo - The value to count up to
 * @returns {string} - HTML string unordered list of number
 */

function countHtml(start, countTo){
    let html = 'The parameters must be numeric';

    //Validate user input
    if(!isNaN(countTo) && !isNaN(start)){
        //Not support backwards counting
        if(start <= countTo){
            html = 'We are not supporting backwards counting yet';
            return html;
        }

        html = `<div>Let's count from ${start} to ${countTo}</div>`;

        html+= '<ul>';


        for(let i = start; i<= countTo; i++) {
            html += `<li style="font-weight:bold;">${i}</li>`;
        }


        html += '</ul>';

    }

    return html;

}

//#endregion

const vehicles = [
    {
        id: 1,
        make: 'Jeep',
        model: 'Wrangler',
        description: 'Go anywhere',
        img: 'https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb25e46530b1e3d8e88cb10/stills_0640_png/MY2021/14720/14720_st0640_116.png'
    }, {
        id: 2,
        make: 'Land Rover',
        model: 'Defender',
        description: 'Go anywhere in style',
        img: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/161973510117619813_7bcb68e7-8a52-402b-968e-cab8e92e7247_812x.jpg?v=1620341041'
    }, {
        id: 3,
        make: 'Toyota',
        model: '4Runner',
        description: 'Go anywhere reliably',
        img: 'https://cars.usnews.com/pics/size/776x517/images/Auto/izmo/i159614327/2021_toyota_4runner_angularfront.jpg'
    }, {
        id: 4,
        make: 'Chevrolet',
        model: 'Cruze',
        description: 'leave you stranded',
        img: 'https://tdrresearch.azureedge.net/photos/chrome/Expanded/White/2011CHE022a/2011CHE022a01.jpg'
    }
]

app.get('/vehicles', (req, res) =>{
    const id = parseInt(req.query.id);

    let html = '<h1>Vehicles</h1>';

    if (isNaN(id)){
        html += '<h2>Available Inventory</h2>';

        html += '<div>';

        for (const v of vehicles) {
            html += `<div>
                <a href="/vehicles?id=${v.id}">${v.make} ${v.model}</a>

            </div>`;
        }

        html += '</div>';
    }else{
        const vehicle = vehicles.find(v => v.id === id);

        if(!!vehicle) {
            html += `<h2>${vehicle.make} ${vehicle.model}</h2>`;
            html += `<div>${vehicle.make} ${vehicle.model} will ${vehicle.description}</div>`;
            html += `<div><img src="${vehicle.img}" style="height:200px;" /></div>`;
        }else{
            html += `<h3>Vehicle not found id: ${id}</h3>`;
        }

        html += '<div><a href="/vehicles">Back to list</div>';
    }


    res.send(html);
});

// #region Server start

app.get('*',(req, res) =>{
    res.status(404).send('<h2>Page requested not found</h2>');
})


//Start the web server
app.listen(3000, () => {
    console.log(chalk.green(`Express server listening at http://localhost:3000 pid ${process.pid}`));
    
});

// #endregion