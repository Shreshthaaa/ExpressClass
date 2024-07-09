const express = require('express');
const app = express();


app.use(express.json());
app.use(middleWare);
app.use(logger);
let courses = [ 
    { id: 1, name: "java" }, 
    { id: 2, name: "javascript" }, 
    { id: 3, name: "python" }
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    console.log(req.body);
    let singleCourse = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(singleCourse);
    res.send(courses);
});

//put val update id 1 to spring
// delete call delete id 2

app.put('/courses/:id', (req, res) => {
    try {
        let singleCourse = courses.find((course) => {
            return course.id === +req.params.id
        })

        if(!singleCourse) {
            res.status(400).send('course does not exist');
        }

        singleCourse.name = req.body.name;
        res.send(courses);
    } catch(err) {
        res.status(500).send(err);
    }
})

function middleWare(req, res, next) {
    console.log("called");
    next();
}

//logger
function logger(req, res, next) {
    console.log(req.method, req.ip, req.hostname, new Date());
    next();
}


app.listen(3000, () => {
    console.log("server started");
});
