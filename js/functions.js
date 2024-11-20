const getBlocks = () => {
    let blockArray = [];

    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=6`).then((resp) => {
        console.log(resp.data);
        blockArray = resp.data;

        // Timeout prima di eseguire il foreach in modo da caricare le immagini
        setTimeout(() => {
            blockArray.forEach(block => {
                let card =
                    `<div class="col-12 col-md-6 col-lg-4 all-card" data-card-id="${block.id}">
                        <div class="card-container">
                            <div class="card d-flex justify-content-center align-items-center" data-card-id="${block.id}">
                                <!-- SVG puntina come elemento assoluto -->
                                <div class="pin-container">
                                    <img src="./img/pin.svg" class="pin">
                                </div>
                                <button class="delete-btn btn btn-danger"><i class="bi bi-trash-fill"></i></button>
                                <img src="${block.thumbnailUrl}" class="square d-flex justify-content-center align-items-center mb-2 clickable-img" />
                                <p>${block.title}</p>
                            </div>
                        </div>
                    </div>`;
                $listElement.innerHTML += card;


            });



            console.log("Nascondo lo spinner");

            $spinnerElement.classList.add('d-none');


            // rimuovi le card 
            const $cards = $all('.all-card');

            $cards.forEach(card => {
                const deleteBtn = card.querySelector('.delete-btn');

                deleteBtn.addEventListener("click", function () {
                    const cardID = card.dataset.cardId;
                    console.log(`Eliminazione della card con ID: ${cardID}`);


                    const targetCard = $one(`.all-card[data-card-id="${cardID}"]`);
                    if (targetCard) {
                        targetCard.innerHTML = '';
                        console.log(`Card con ID ${cardID} eliminata.`);
                    } else {
                        console.error(`Errore: Card con ID ${cardID} non trovata.`);
                    }
                });
            });




            // carica le immagini nel modale
            const $images = $all('.clickable-img');

            $images.forEach(image => {
                image.addEventListener("click", function (e) {


                    const card = image.closest('.card');
                    const cardID = parseInt(card.dataset.cardId);

                    const cardImg = () => {
                        const foundObject = blockArray.find(block => block.id === cardID);
                        if (foundObject) {
                            return foundObject;
                        } else {
                            console.error(`Errore: nessuna immagine trovata per la card con ID: ${cardID}`);
                            return null;
                        }
                    };

                    const imageObj = cardImg();
                    if (imageObj) {
                        console.log('immagine della card:', imageObj.url);

                        $modale.classList.remove('d-none');
                        $modale.classList.add('d-flex');

                        $imgContainer.innerHTML = `<img src="${imageObj.url}" alt="${imageObj.title}" class="img-fluid" />`;
                    }
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
