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
            const posts = result.rows.map(p => new Post(p))
            resolve(posts);
        } catch (err) {
            reject("Error retrieving posts")
        }
    })
};

static findById(id){
    return new Promise (async (res,rej) =>{
        try{
            const result = await db.query(`SELECT * FROM posts WHERE id = $1`,[id])
            const post = await result.rows[0];
            res(post)
        } catch(err){
            rej("Could not find post")
        }
    })
}

static create(data){
    return new Promise (async (resolve, reject) => {
        try {
            const {title, name, body} = data;
            let postData = await db.query(`INSERT INTO posts (title, name, body) VALUES ($1, $2, $3) RETURNING id,title, name, body;`, [title, name, body ]);
            let newPost = new Post(postData.rows[0]);
            resolve (newPost);
        } catch (err) {
            reject('Post could not be created');
        };
    });
};
};

module.exports = Post;