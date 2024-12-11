const imageLib = [
    {
        nayagarah: [
            ' https://content.jdmagicbox.com/comp/nayagarh/m5/9999p6753.6753.220318014526.u9m5/catalogue/rajagiri-waterfall-nayagarh-tourist-attraction-jdogr4cq6x.jpg'
        ],
        Puri: [
            'https://www.mypuritour.com/wp-content/uploads/2022/08/puri-tour-2022.jpeg',
            'https://www.mypuritour.com/wp-content/uploads/2022/08/puri-tour-2022.jpeg'
        ],
        
        
        

        
    }
    
]

const searchButton = document.querySelector('.search-btn');

function getFormValues(event) {
    event.preventDefault();

    const from = document.getElementById('from').value;
    const fromDate = document.getElementById('from-date').value;
    const to = document.getElementById('to').value;
    const toDate = document.getElementById('to-date').value;
    const travelClass = document.getElementById('class').value;
    if (travelClass === 'select') {
        alert('Please select a valid class');
    } else {
        const formData = {
            from: from,
            to: to,
            fromDate: fromDate,
            toDate: toDate,
            class: travelClass
        };
        console.log('formdata: ', formData)
        fetch('http://192.168.167.33:8080/search-hidden-places', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Hidden places", data);

            // Store the packages data in localStorage
            localStorage.setItem('tourPackages', JSON.stringify(data));

            // Redirect to second.html to display the data
            window.location.href = 'second.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const packagesContainer = document.querySelector('.packages');
    
    // Get the stored packages from localStorage
    const storedPackages = localStorage.getItem('tourPackages');
    const objectify = JSON.parse(storedPackages)

    const dist = objectify[0].dist
    console.log(dist)
    const images = imageLib[0][dist]

    
    if (storedPackages) {
        const packages = JSON.parse(storedPackages);

        packagesContainer.innerHTML = '';

        packages.forEach((pkg, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = images[index];
            card.appendChild(img);

            const title = document.createElement('h2');
            title.textContent = pkg.name;
            card.appendChild(title);

            const description = document.createElement('p');
            description.textContent = pkg.description;  
            card.appendChild(description);

            const viewButton = document.createElement('a');
            viewButton.href = '/tour-package/third.html';  // Assuming 'detailsUrl' contains a link to the package details
            viewButton.classList.add('btn');
            viewButton.textContent = 'View Details';
            card.appendChild(viewButton);

            const bookButton = document.createElement('a');
            bookButton.href = pkg.bookingUrl;  // Assuming 'bookingUrl' contains a link to book the package
            bookButton.classList.add('btn');
            bookButton.textContent = 'Book Now';
            card.appendChild(bookButton);

            // Append the card to the container
            packagesContainer.appendChild(card);
        });
    } else {
        packagesContainer.innerHTML = '<p>No tour packages found.</p>';
    }
});