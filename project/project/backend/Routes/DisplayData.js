const express = require('express')
const router = express.Router()

router.post('/displayData', (req, res)=>{
    try{
        console.log(global.packages)
        res.send([global.packages])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
})

module.exports = router;