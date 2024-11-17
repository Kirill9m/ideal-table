// https://jsonplaceholder.typicode.com/users
const dataContainer = document.querySelector(".data-container");

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Data cant be downloaded')
        }
        const data = await response.json();
        const filteredData = data.filter(data => data.id);
        return filteredData;
    } catch (error) {
        console.log('error:', error.message);
    }
}

class UserData {
    constructor(id, name, username, email, address, phone, website, company) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.company = company;
    }

    showUsers() {
        const displayData = document.createElement("li");
        displayData.innerHTML = `
            <h2>${this.name}</h2>
            <p>Username: ${this.username}</p>
            <p>Email: ${this.email}</p>
            <p>Phone: ${this.phone}</p>
            <p>Company: ${this.company.name}</p>
            <hr>
        `;

        const button = document.createElement("div");
        button.style.border = '2px solid gray';
        button.style.backgroundColor = 'lightgray';
        button.style.color = 'black';
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px';
        button.innerHTML = "Go to website"

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = 'darkgray';
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = 'lightgray';
        });

        button.addEventListener('click', () => {
            const fullUrl = this.website.startsWith('http') ? this.website : 'https://' + this.website;
            window.location.href = fullUrl;
        });;

        displayData.appendChild(button);

        return displayData;
    }
}

const displayUsers = async () => {
    const users = await fetchUsers();
    const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));;
    console.log(sortedUsers);
    if (sortedUsers) {
        sortedUsers.forEach(user => {
            const myUser = new UserData(
                user.id,
                user.name,
                user.username,
                user.email,
                user.address,
                user.phone,
                user.website,
                user.company
            );
            dataContainer.appendChild(myUser.showUsers());
        })
    }

}

displayUsers();
