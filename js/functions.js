/**
 * Restituisce nel DOM una lista di foto con tanto di descrizione.
 * Aggiunge funzionalità di rimozione card e gestione immagini in un modale.
 */
const getBlocks = () => {
    let blockArray = []; // Array per salvare i dati delle immagini

    // Effettua una chiamata API per ottenere immagini e dettagli
    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=6`).then((resp) => {
        console.log(resp.data); // Logga la risposta API per debug
        blockArray = resp.data; // Salva i dati delle immagini nell'array

        // Timeout prima di eseguire il ciclo `forEach` per simulare il caricamento
        setTimeout(() => {
            // Aggiunge dinamicamente le card al DOM per ogni immagine nell'array
            blockArray.forEach(block => {
                let card =
                    `<div class="col-12 col-md-6 col-lg-4 all-card" data-card-id="${block.id}">
                        <div class="card-container">
                            <div class="card d-flex justify-content-center align-items-center" data-card-id="${block.id}">
                                <!-- SVG puntina come elemento assoluto -->
                                <div class="pin-container">
                                    <img src="./img/pin.svg" class="pin">
                                </div>
                                <!-- Bottone per eliminare la card -->
                                <button class="delete-btn btn btn-danger"><i class="bi bi-trash-fill"></i></button>
                                <!-- Immagine cliccabile -->
                                <img src="${block.thumbnailUrl}" class="square d-flex justify-content-center align-items-center mb-2 clickable-img" />
                                <p>${block.title}</p>
                            </div>
                        </div>
                    </div>`;
                $listElement.innerHTML += card; // Aggiunge la card al container
            });

            console.log("Nascondo lo spinner");
            $spinnerElement.classList.add('d-none'); // Nasconde lo spinner di caricamento

            // Seleziona tutte le card create dinamicamente
            const $cards = $all('.all-card');

            // Aggiunge un listener a ciascuna card per gestire la rimozione
            for (let i = 0; i < $cards.length; i++) {
                const card = $cards[i];
                const deleteBtn = card.querySelector('.delete-btn');

                deleteBtn.addEventListener("click", function () {
                    const cardID = card.dataset.cardId; // Ottiene l'ID della card
                    console.log(`Eliminazione della card con ID: ${cardID}`);

                    // Trova e rimuove la card corrispondente dal DOM
                    const targetCard = $one(`.all-card[data-card-id="${cardID}"]`);
                    if (targetCard) {
                        targetCard.innerHTML = ''; // Svuota il contenuto della card
                        console.log(`Card con ID ${cardID} eliminata.`);
                        removeCardFromArray(cardID); // Rimuove la card dall'array
                    } else {
                        console.error(`Errore: Card con ID ${cardID} non trovata.`);
                    }
                });
            }

            // Seleziona tutte le immagini cliccabili
            const $images = $all('.clickable-img');

            // Rimuove una card dall'array basandosi sull'ID
            const removeCardFromArray = (cardID) => {
                blockArray = blockArray.filter(block => block.id !== parseInt(cardID)); // Aggiorna l'array
                console.log(`Card con ID ${cardID} rimossa dall'array.`);
                updateModalImages(); // Aggiorna le immagini del modale
            };

            // Funzione per aggiornare il comportamento del modale con le immagini rimanenti
            const updateModalImages = () => {
                const $images = $all('.clickable-img'); // Seleziona nuovamente tutte le immagini cliccabili

                // Aggiunge un listener aggiornato per ogni immagine
                $images.forEach((image, index) => {
                    image.addEventListener("click", () => {
                        $modale.classList.remove('d-none'); // Mostra il modale
                        $modale.classList.add('d-flex');
                        showImageInModal(index); // Mostra l'immagine nel modale
                    });
                });
            };

            // Funzione per visualizzare l'immagine selezionata nel modale
            const showImageInModal = (index) => {
                // Controlla se l'indice è valido
                if (index >= 0 && index < blockArray.length) {
                    const imageObj = blockArray[index];
                    $imgContainer.innerHTML = `<img src="${imageObj.url}" alt="${imageObj.title}" class="img-fluid" />`; // Aggiunge l'immagine al modale
                    currentIndex = index; // Aggiorna l'indice corrente
                }
            };

            // Aggiunge un listener per ogni immagine cliccabile
            $images.forEach((image, index) => {
                image.addEventListener("click", () => {
                    $modale.classList.remove('d-none'); // Mostra il modale
                    $modale.classList.add('d-flex');
                    showImageInModal(index); // Mostra l'immagine cliccata nel modale
                });
            });

            // Seleziona i pulsanti di navigazione nel modale
            const $prevBtn = $one('.btn-prev');
            const $nextBtn = $one('.btn-next');

            // Listener per il pulsante "Precedente"
            $prevBtn.addEventListener("click", () => {
                const prevIndex = (currentIndex - 1 + blockArray.length) % blockArray.length; // Calcola l'indice precedente
                showImageInModal(prevIndex);
            });

            // Listener per il pulsante "Successivo"
            $nextBtn.addEventListener("click", () => {
                const nextIndex = (currentIndex + 1) % blockArray.length; // Calcola l'indice successivo
                showImageInModal(nextIndex);
            });

        }, 5000); // Timeout di 5 secondi prima di aggiungere le card
    }).catch((error) => {
        // Gestione degli errori nella richiesta API
        if (error.code === 'ECONNABORTED') {
            console.error("La richiesta è scaduta dopo 5 secondi.");
        } else {
            console.error("Errore nell'API:", error.message);
        }

        $spinnerElement.style.display = 'none'; // Nasconde lo spinner in caso di errore
    });
};
