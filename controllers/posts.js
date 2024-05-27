const path = require('path');
const fs = require('fs');
let allPosts = require("../db/db.json")

const index = (req, res) => {
    let html = "<ul class='bigUl'>"
    allPosts.forEach(el => {
        html += `<li>
                    <h2>${el.title}</h2>
                    <img src="/imgs/posts/${el.image}" width="300px"/>
                    <p>${el.content}</p>`
            html += `<div>
                        <ul class="tagList">`

            el.tags.forEach(tag => {
                    html += `<li>${tag}</li>`
            })
            html += `   </ul>
                    </div>`
        html += `</li>`
    })
    html += `</ul>
    <style>
        .bigUl{
            text-align: center;
            list-style-type: none;
        }
        .tagList{
            display: flex;
            justify-content: center;
            gap: 20px;
            list-style-type: none;
        }
        .taglist li {
            padding: 5px 10px;
            background-color: lime;
        }
     
    </style>
    `
    res.send(html)
}

const show = (req, res) => {
    let requestedPostSlug = req.params.slug;
    let outputPost = allPosts.find(post => post.slug === requestedPostSlug);
    res.format({
        json: () => {
            if (outputPost){
                res.json({...outputPost})
            }
        }
    })
}

const create = (req, res) => {

}

const download = (req, res) => {
}

module.exports = {
    index,
    show,
    download,
    create
}
