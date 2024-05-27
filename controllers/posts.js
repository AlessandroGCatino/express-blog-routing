const path = require('path');
const fs = require('fs');
let allPosts = require("../db/db.json")

const index = (req, res) => {
    let html = "<ul class='bigUl'>"
    allPosts.forEach(el => {
        let encodedSlug = encodeURIComponent(el.slug)
        html += `<li>
                    <h2>${el.title}</h2>
                    <a href='/posts/${encodedSlug}' ><img src="/imgs/posts/${el.image}" width="300px"/></a>
                    <p>${el.content}</p>
                    <div>
                        <ul class="tagList">`

            el.tags.forEach(tag => {
                    html += `<li>${tag}</li>`
            })
            html += `   </ul>
                    </div>
                </li>`
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
    let encodedSlug = encodeURIComponent(outputPost.slug)

    res.format({
        json: () => {
            if (outputPost){
                res.json({...outputPost, image_url: `/imgs/posts/${outputPost.image}`, image_download_url: `/posts/${encodedSlug}/download`})
            }
        },
        html: () => {
            let html = `<h2 class="bigUl">${outputPost.title}</h2>
                        <div>
                        <a href='/posts/${encodedSlug}/download'><img src="/imgs/posts/${outputPost.image}" width="300px"/></a>
                        </div>
                        <p>${outputPost.content}</p>
                        <div>
                            <ul class="tagList">`
                        outputPost.tags.forEach(tag => {
                        html += `<li>${tag}</li>`
                        })
                html += `   </ul>
                        </div>
                        <style>
                            div{
                                display: flex;
                                justify-content:center;
                            }
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
                        
                        </style>`
            res.send(html)
        }

    })
}

const create = (req, res) => {
    res.format({
        html: () => {
            let html = `<h1> Creazione nuovo post </h1>`;
            res.send(html);
        },
        default: () => {
            res.status(406).send("Error. Not Acceptable.")
        }
    })

}

const download = (req, res) => {
    const requestedPost = req.params.slug
    const selectedPost = allPosts.find(post => requestedPost === post.slug);
    const filePath = path.join(__dirname, `../public/imgs/posts/${selectedPost.image}`)
    if (selectedPost && fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send("Image not found")
    }
}

module.exports = {
    index,
    show,
    download,
    create
}
