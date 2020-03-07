const txtNewName = document.getElementById('newName');
const txtNewBirthday = document.getElementById('newBirthday');
const txtContactId = document.getElementById('contactId');

// Set date to today's date
txtNewBirthday.valueAsDate = new Date();

fetch('http://localhost:3000/contacts')
.then(results => results.json())
.then(results => {

    for (let index = 0; index < results.length; index++) {
        const element = results[index];

        console.log(element);

        var newContact = document.createElement('div');
        var contactName = document.createElement('p');
        var contactId = document.createElement('p');
        contactId.innerText = element._id;
        contactId.className = "indent alt-highlight";
        contactName.innerText = element.name.first + " " + element.name.last;
        newContact.className = "contact";
        newContact.appendChild(contactName);
        newContact.appendChild(contactId);
        document.getElementById('contacts').appendChild(newContact)
    }

})
.catch(err => {
    console.log('Error: ' + err);
})

function addContact() {
    const name = txtNewName.value.split(" ");
    var first = name[0];
    var last = "";
    if (name.length > 1) {
        last = name[1];        
    }
    const birthday = txtNewBirthday.value;

    const mybody = JSON.stringify({
        name: {
            "first": first,
            "last": last
        },
        "birthday": birthday
    });

    console.log('Sending:\n' + mybody);

    fetch('http://localhost:3000/contacts/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: mybody
    })
    .then(results => results.json())
    .then(results => {
        alert("Sent new contact to database: " + results.message);
        location.reload();
    })
    .catch(err => {
        console.log('Error: ' + err);
    })
}

function deleteContact() {
    if (txtContactId.value === undefined || txtContactId.value === "") {
        console.log('Nulled value for deletation');
        return;
    }

    fetch('http://localhost:3000/contacts/' + txtContactId.value, {
        method: "DELETE"
    })
    .then(results => results.json())
    .then(results => {
        alert("Database says: " + results.message);
        location.reload();
    })
    .catch(err => {
        console.log('Error: ' + err);
    })
}
