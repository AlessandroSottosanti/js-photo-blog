

const $one = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

const $listElement = $one('#list-element');
const $spinnerElement = $one('#spinner');
const $closeBtn = $one('#close-modal');
const $modale = $one('.modale');
const $imgContainer = $one('.img-container');


getBlocks();


$closeBtn.addEventListener("click", function () {
    $modale.classList.add('d-none');
});




