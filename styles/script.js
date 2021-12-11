//if its a smartphone dont execute the script
if (window.innerWidth > 768) {
    //if the user click on an item form the sidebar add an arrow next to it
    addEventListener("click", function (e) {
        var item = e.target;
        if (item.classList.contains("selected")) {
            item.classList.remove("selected");
        } else if (item.classList.contains("sidebar-item")) {
            try {
                document.querySelector(".selected").classList.remove("selected");
            } catch (e) {
            }
            item.classList.add("selected");
        }
    });
}

// Init when page is loaded
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init Typewriter
    new Typewriter(txtElement, words, wait);
}

//class for the typewriter
class Typewriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}