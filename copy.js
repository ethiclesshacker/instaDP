const form = document.getElementById('form');
const input = document.querySelector('.inputField')
const image = document.querySelector('.image-div')

form.addEventListener('input', gotData);
form.addEventListener('submit', formSubmit);

function gotData(event) {
    console.log(input.value);
    const id = input.value;
    const url = `https://www.instagram.com/web/search/topsearch/?context=blended&query=${id}&rank_token=0.7997368636483357&include_reel=true`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            image.innerHTML = ''
            data.users.forEach((item) => {

                let temp = `<img src="${item.user.profile_pic_url}" alt="">
                        <p>${item.user.full_name}</p>
                        <p>@${item.user.username}</p`

                let div = document.createElement('div');
                div.innerHTML = temp;
                image.appendChild(div);
            })
        }
        );
    event.preventDefault();
}


function formSubmit(event) {
    console.log(input.value);
    const id = input.value;
    fetch(`https://www.instagram.com/${id}`)
        .then(response => response.text())
        .then(data => {
            console.log(data.match(/<title>(.?)/))
            // console.log(data);
            let link = data.match(/profile_pic_url_hd":"(.+?)",/i);
            let src = decodeURIComponent(JSON.parse(`"${link[1]}"`));
            console.log(src);
            let imgTag = document.createElement('img');
            imgTag.src = src;
            image.innerHTML = '';
            image.appendChild(imgTag);
        }
        );
    input.value = '';
    event.preventDefault();
}


// const img = document.createElement('img');
// img.src = item.user.profile_pic_url;

// const name = document.createElement('p');
// name.innerText = item.user.full_name;

// const user_id = document.createElement('p');
// user_id.innerText = item.user.username;

// image.appendChild(img);
// image.appendChild(name);
// image.appendChild(user_id);