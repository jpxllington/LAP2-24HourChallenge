const db = require('../dbConfig/init');

class Post {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.name = data.name;
        this.body = data.body;
    };

static get all(){ 
    return new Promise (async (resolve, reject) => {
        try {
            const result = await db.query(`SELECT * FROM posts;`)
            const posts = result.rows.map(p => new Author(p))
            resolve(posts);
        } catch (err) {
            reject("Error retrieving posts")
        }
    })
};

static create(name){
    return new Promise (async (resolve, reject) => {
        try {
            let postData = await db.query('INSERT INTO posts (title, name, body) VALUES ($1, $2, $3) RETURNING title, name, body;', [ title, name, body ]);
            let newPost = new Post(postData.rows[0]);
            resolve (newPost);
        } catch (err) {
            reject('Post could not be created');
        };
    });
};
};