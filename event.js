const form = document.getElementById('form');
const input = document.querySelector('.inputField')
const image = document.querySelector('.image-div')


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
            image.appendChild(imgTag);
        }
        );
    input.value = '';
    event.preventDefault();
}





form.addEventListener('submit', formSubmit);