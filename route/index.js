const router = require('express').Router()
const path = require('path')

router.route('/')
.get((req, res)=>{
    const page = path.join(path.parse(__dirname).dir, 'public/index.htm')
    res.sendFile(page)
})

module.exports = router