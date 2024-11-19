const getBlocks = () => {
    let blockArray = [];

    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=6`).then((resp) => {
        console.log(resp.data);
        blockArray = resp.data;

        // Timeout prima di eseguire il foreach in modo da caricare le immagini
        setTimeout(() => {
            blockArray.forEach(block => {
                $listElement.innerHTML += 
                `<div class="col-12 col-md-6 col-lg-4">
                    <div class="card-container">
                        <div class="card d-flex justify-content-center align-items-center">
                            <img src="${block.thumbnailUrl}" class="square d-flex justify-content-center align-items-center mb-2" />
                            <p>${block.title}</p>
                        </div>
                    </div>
                </div>`;
            });

            // Debug: Verifica se lo spinner viene nascosto
            console.log("Nascondo lo spinner");
            $spinnerElement.style.display = 'none';

        }, 5000);
    }).catch((error) => {
        // Gestiamo eventuali errori
        if (error.code === 'ECONNABORTED') {
            console.error("La richiesta è scaduta dopo 5 secondi.");
        } else {
            console.error("Errore nell'API:", error.message);
        }

        $spinnerElement.style.display = 'none';

    });
};
