getBlocks = () => {
    let blockArray = [];

    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=6`, {
        timeout: 5000 
    }).then((resp) => {
        console.log(resp.data);
        blockArray = resp.data;

        blockArray.forEach(block => {
            $listElement.innerHTML += 
            `<div class="col-12 col-md-6 col-lg-4">
                <div class="card-container">
                    <div class="card d-flex justify-content-center align-items-center">
                        <img src="${block.thumbnailUrl}" class="square d-flex justify-content-center align-items-center mb-2" />
                        <p class="description">${block.title}</p>
                    </div>
                </div>
            </div>`;
        });
    }).catch((error) => {
        // Gestiamo eventuali errori
        if (error.code === 'ECONNABORTED') {
            console.error("La richiesta è scaduta dopo 5 secondi.");
        } else {
            console.error("Errore nell'API:", error.message);
        }
    });
}
