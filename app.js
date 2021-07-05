const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const flags = require('./flags');


app.get('/', (req, res)=> {
    var path = require('path');
    res.sendFile(path.resolve('./index.html'));
})

app.get('/api/flags', (req, res)=> {
    res.send(flags)
})

app.get('/api/flag/:flag', (req, res)=> {
    const flag = flags.find(f => f.flag === req.params.flag)
    if (!flag) res.status(404).send('Invalid Flag')
    
    res.send(flag)
})

app.get('/api/flagName/:name', (req, res)=> {
    const name = flags.find(n => n.name === capitalizeFirstLetter(req.params.name))
    if (!name) res.status(404).send('Invalid Name')
    
    res.send(name)
})

app.get('/api/flagCode/:code', (req, res)=> {
    const code = flags.find(c => c.code === capitalizeLetter(req.params.code))
    if (!code) res.status(404).send('Invalid Code')
    
    res.send(code)
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });


///Flag Name
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

///Flag Code
function capitalizeLetter(string) {
    return string.toUpperCase();
  }