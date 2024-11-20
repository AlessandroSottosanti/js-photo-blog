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

            for (let i = 0; i < $cards.length; i++) {
                const card = $cards[i];
                const deleteBtn = card.querySelector('.delete-btn');

                deleteBtn.addEventListener("click", function () {
                    const cardID = card.dataset.cardId;
                    console.log(`Eliminazione della card con ID: ${cardID}`);

                    const targetCard = $one(`.all-card[data-card-id="${cardID}"]`);
                    if (targetCard) {
                        targetCard.innerHTML = '';
                        console.log(`Card con ID ${cardID} eliminata.`);
                        removeCardFromArray(cardID, i);  // Rimuovi la card dall'array
                    } else {
                        console.error(`Errore: Card con ID ${cardID} non trovata.`);
                    }
                });
            }



            const $images = $all('.clickable-img');

            // rimuovi le card dall'array una volta cancellate
            const removeCardFromArray = (cardID) => {
                blockArray = blockArray.filter(block => block.id !== parseInt(cardID));
                console.log(`Card con ID ${cardID} rimossa dall'array.`);
            
                updateModalImages();
            };
            
            // Funzione per aggiornare il modale con le immagini rimanenti
            const updateModalImages = () => {
                const $images = $all('.clickable-img');
            
                // Aggiungi un nuovo listener per ogni immagine, aggiornando l'array
                $images.forEach((image, index) => {
                    image.addEventListener("click", () => {
                        $modale.classList.remove('d-none');
                        $modale.classList.add('d-flex');
                        showImageInModal(index); // Passa l'indice aggiornato
                    });
                });
            };

            // Funzione per mostrare l'immagine corrente nel modale
            const showImageInModal = (index) => {
                console.log("Lunghezza dell'array dentro showImageInModal()", blockArray.length);
                // Mostra l'immagine solo se l'indice è valido
                if (index >= 0 && index < blockArray.length) {
                    const imageObj = blockArray[index];
                    $imgContainer.innerHTML = `<img src="${imageObj.url}" alt="${imageObj.title}" class="img-fluid" />`;
                    currentIndex = index;
                }
            };


            // Evento per ogni immagine cliccabile
            $images.forEach((image, index) => {
                image.addEventListener("click", () => {
                    $modale.classList.remove('d-none');
                    $modale.classList.add('d-flex');
                    showImageInModal(index);
                });
            });

            // Gestione delle frecce
            const $prevBtn = $one('.btn-prev');
            const $nextBtn = $one('.btn-next');

            $prevBtn.addEventListener("click", () => {
                const prevIndex = (currentIndex - 1 + blockArray.length) % blockArray.length;
                showImageInModal(prevIndex);
            });

            $nextBtn.addEventListener("click", () => {
                const nextIndex = (currentIndex + 1) % blockArray.length;
                showImageInModal(nextIndex);
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
