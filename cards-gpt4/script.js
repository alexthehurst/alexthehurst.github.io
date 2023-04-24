document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("card-game");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    const cardWidth = 70;
    const cardHeight = 100;

    // Define suits and ranks for the deck
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = [
        "ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"
    ];

    class Card {
        constructor(suit, rank, x, y) {
            this.suit = suit;
            this.rank = rank;
            this.x = x;
            this.y = y;
            this.faceUp = false;
        }

        draw() {
            if (this.faceUp) {
                // Draw the card face
                // Replace this with the actual card image for the specific suit and rank
                ctx.fillStyle = "white";
                ctx.fillRect(this.x, this.y, cardWidth, cardHeight);
                ctx.fillStyle = "black";
                ctx.fillText(this.rank.toUpperCase(), this.x + 5, this.y + 20);
                ctx.fillText(this.suit.toUpperCase(), this.x + 5, this.y + 40);
            } else {
                // Draw the card back
                ctx.fillStyle = "red";
                ctx.fillRect(this.x, this.y, cardWidth, cardHeight);
                // Add a stroke around the card
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.x, this.y, cardWidth, cardHeight);
                
            }
        }

        flip() {
            this.faceUp = !this.faceUp;
        }

        isClicked(x, y) {
            return x >= this.x && x <= this.x + cardWidth &&
                y >= this.y && y <= this.y + cardHeight;
        }
    }

    const deck = [];

    let newCardY = 0;
    for (const suit of suits) {
        for (const rank of ranks) {

            deck.push(new Card(suit, rank, newCardY, 250));
            newCardY += 5;
        }
    }

    function drawTable() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const card of deck) {
            card.draw();
        }
    }

    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (const card of deck) {
            if (card.isClicked(x, y)) {
                card.flip();
                drawTable();
                break;
            }
        }
    });

    drawTable();
});
