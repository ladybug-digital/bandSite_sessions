const form = document.querySelector('#contact');

const formSubmit = (e) => {
    e.preventDefault();
    let name = document.querySelector('#contact input[name="name"]').value;
    let email = document.querySelector('#contact input[name="email"]').value;
    let message = document.querySelector('#contact textarea[name="message"]').value;
    
    if (name && email && message) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
            console.log(formData);
        fetch('https://getform.io/f/9ce15866-7cd9-402e-9d38-d62c9e932181', {
            method: "POST",
            body: formData,
        }).then((response) => {
            if (response.status == 200) { form.submit(); }
            else { alert('FAILURE! TRY AGAIN LATER!');}
        }).catch((error) => {
            console.log(error);
        })

    } else {
        alert('Please enter all fields!');
    }
}

form?.addEventListener('submit', formSubmit);
form?.reset();