const express = require('express')
const { Pool } = require('pg')
const path = require('path')

const app = express()


var pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:123123123@localhost:5432/cmpt276"
})
// 2
// console.log('addition', addition)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// GET /
app.get('/', async (req, res)=> {
  var userinsertquery = `SELECT * FROM student`
  try{
      const result = await pool.query(userinsertquery)
      res.json(result.rows)
      // res.render('pages/index.ejs', { student_list : result.rows})
  }catch(error){

  }
})


app.get('/updatePage', (req,res)=> {
  res.render('pages/update.ejs')
})

app.get('/insertPage', (req,res)=> {
  res.render('pages/insert.ejs')
})


// app.get -----> res.render
// app.post -----> res.redirect

app.post('/deleteStudent/:id', async (req, res)=> {
  const id = req.params.id
  var deleteQuery = `DELETE FROM student WHERE id=${id};`
  try{
    await pool.query(deleteQuery)
    // res.json({})
    res.redirect('/')
  }catch(error){

  }
})

app.post('/addStudent', async (req, res)=> {
  const name = req.body.name || ''
  const hc = req.body.hc || ''
  const wt = req.body.wt || ''
  const ht = req.body.ht || ''

  var insertQuery = `INSERT INTO student(name, hair_color, height, weight) VALUES ('${name}', '${hc}', '${ht}', '${wt}');`
  try{
    await pool.query(insertQuery)
    // res.json({})
    res.redirect('/')
  }catch(error){

  }
})




// produciton ----> heroku 
// process.env.PORT

// default port number
// 5000

const PORT = process.env.PORT || 5001
app.listen(PORT, ()=> {
  console.log(`this is runnign on port ${PORT}`)
})

console.log('express', typeof express)

console.log('Pool', typeof Pool)