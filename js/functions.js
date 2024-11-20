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
                        <div class="card d-flex justify-content-center align-items-center" data-card-id="${block.id}">
                        <!-- SVG puntina come elemento assoluto -->
                            <div class="pin-container">
                                <img src="./img/pin.svg" class="pin">
                            </div>
                            <img src="${block.thumbnailUrl}" class="square d-flex justify-content-center align-items-center mb-2" />
                            <p>${block.title}</p>
                        </div>
                    </div>
                </div>`;


            });



            console.log("Nascondo lo spinner");

            $spinnerElement.classList.add('d-none');

            const $cards = $all('.card');


            $cards.forEach(card => {
                card.addEventListener("click", function () {

                    const cardID = parseInt(card.dataset.cardId);
                    console.log(cardID);

                    const cardImg = () => {
                        const foundObject = blockArray.find((block) => block.id === cardID);
                        if (foundObject) {
                            return foundObject;
                        }
                        else {
                            alert(`Errore: nessuna immagine trovata per la card con ID: ${cardID}`);
                            return null;
                        }
                    };

                    console.log('immagine della card:', cardImg().url);

                    $modale.classList.remove('d-none');
                    $modale.classList.add('d-flex');

                    $imgContainer.innerHTML = `<img src="${cardImg().url}" alt="${cardImg().title}" class="img-fluid" />`;
                });
            });



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
