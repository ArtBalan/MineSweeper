let myBoard = new Board(10, 10, 10);
class Board {
    width;
    height;
    minenbr;
    mineList;
    flagSet;
    trueFlag;
    board;
    cellList;
    affichage;
    /**
     * Construct a minesweeper board on the #board HTML element.
     * @param {int} width - Number of cell in width for the board
     * @param {int} height - Number of cell in height for the board
     * @param {int} mineNbr - Number of mines to set on the board
     * @returns {boolean}
     */
    constructor(width, height, mineNbr) {
        this.width = width;
        this.height = height;
        this.flagSet = 0;
        this.trueFlag = 0;
        this.board = document.getElementById('board');
        this.affichage = document.getElementById('affichage');
        if (width > 0 || height > 0) {
            for (let x = 0; x < height; x++) {
                let row = document.createElement('div');
                row.classList.add('row');
                for (let y = 0; y < width; y++) {
                    let cell = document.createElement('div');
                    cell.innerText = '0';
                    cell.classList.add('cell');
                    cell.classList.add('hidden');
                    row.appendChild(cell);
                }
                this.board.appendChild(row);
            }
            this.cellList = document.getElementsByClassName('cell');
        }
        this.setMines(mineNbr);
        this.setNumber();
        this.setClickAction();
    }
    /**
     * Place a defined number of mines in a list of cell
     * @param {int} nbr - number of mine to set
     */
    setMines(nbr) {
        this.minenbr = nbr;
        this.mineList = [];
        let mineSet = 0;
        while (mineSet !== nbr) {
            let random_Index = Math.floor(Math.random() * this.cellList.length);
            if (this.cellList[random_Index].innerText !== 'M') {
                this.cellList[random_Index].innerText = 'M';
                mineSet += 1;
                this.mineList.push(random_Index);
            }
        }
        this.updateAffichage((this.minenbr - this.flagSet).toString());
    }
    /**
     * Set the cell number
     */
    setNumber() {
        for (let cell_ID = 0; cell_ID < this.cellList.length; cell_ID++) {
            let nbrOfMines = 0;
            if (this.cellList[cell_ID].innerText !== 'M') {
                let x = cell_ID % this.width;
                let y = (cell_ID - (cell_ID % this.width)) / this.width;
                // TOP LEFT
                if (x > 0 && y > 0) {
                    if (this.cellList[x - 1 + ((y - 1) * this.width)].innerText === 'M')
                        nbrOfMines++;
                }
                // MIDDLE LEFT
                if (x > 0) {
                    if (this.cellList[x - 1 + ((y) * this.width)].innerText === 'M')
                        nbrOfMines++;
                }
                //BOTTOM LEFT
                if (x > 0 && y < this.height - 1) {
                    if (this.cellList[x - 1 + ((y + 1) * this.width)].innerText === 'M')
                        nbrOfMines++;
                }
                // BOTTOM MIDDLE
                if (y < this.height - 1) {
                    if (this.cellList[x + ((y + 1) * this.width)].innerText === 'M')
                        nbrOfMines++;
                }
                // BOTTOM RIGHT
                if (x < this.width - 1 && y < this.height - 1) {
                    if (this.cellList[x + 1 + ((y + 1) * this.width)].innerText === 'M')
                        nbrOfMines++;
                }
                // MIDDLE RIGHT
                if (x < this.width - 1) {
                    if (this.cellList[x + 1 + ((y) * this.width)].innerText === 'M')
                        nbrOfMines++;
                }
                //TOP RIGHT
                if (x < this.width - 1 && y > 0) {
                    if (this.cellList[x + 1 + ((y - 1) * this.width)].innerText === 'M')
                        nbrOfMines++;
                }
                if (y > 0) {
                    if (this.cellList[x + ((y - 1) * this.width)].innerText === 'M')
                        nbrOfMines++;
                }
                this.cellList[cell_ID].innerText = nbrOfMines;
            }
        }
        console.log('out');
    }
    /**
     * Reveal a cell and it's neighbours if the cell is equal to 0
     *
     * @param {int} cell_ID - ID of the cell to reveal
     */
    reveal(cell_ID) {
        let x = cell_ID % this.width;
        let y = (cell_ID - (cell_ID % this.width)) / this.width;
        if (!this.cellList[cell_ID].classList.contains('flagged')) {
            this.cellList[cell_ID].classList.remove('hidden');
            if (this.cellList[cell_ID].innerText == 'M')
                this.lost();
        }
        if (this.cellList[cell_ID].innerText === '0') {
            // TOP LEFT
            if (x > 0 && y > 0 && this.cellList[x - 1 + ((y - 1) * this.width)].classList.contains('hidden')) {
                this.reveal(x - 1 + ((y - 1) * this.width));
            }
            // MIDDLE LEFT
            if (x > 0 && this.cellList[x - 1 + ((y) * this.width)].classList.contains('hidden')) {
                this.reveal(x - 1 + ((y) * this.width));
            }
            //BOTTOM LEFT
            if (x > 0 && y < this.height - 1 && this.cellList[x - 1 + ((y + 1) * this.width)].classList.contains('hidden')) {
                this.reveal(x - 1 + ((y + 1) * this.width));
            }
            // BOTTOM MIDDLE
            if (y < this.height - 1 && this.cellList[x + ((y + 1) * this.width)].classList.contains('hidden')) {
                this.reveal(x + ((y + 1) * this.width));
            }
            // BOTTOM RIGHT
            if (x < this.width - 1 && y < this.height - 1 && this.cellList[x + 1 + ((y + 1) * this.width)].classList.contains('hidden')) {
                this.reveal(x + 1 + ((y + 1) * this.width));
            }
            // MIDDLE RIGHT
            if (x < this.width - 1 && this.cellList[x + 1 + ((y) * this.width)].classList.contains('hidden')) {
                this.reveal(x + 1 + ((y) * this.width));
            }
            //TOP RIGHT
            if (x < this.width - 1 && y > 0 && this.cellList[x + 1 + ((y - 1) * this.width)].classList.contains('hidden')) {
                this.reveal(x + 1 + ((y - 1) * this.width));
            }
            if (y > 0 && this.cellList[x + ((y - 1) * this.width)].classList.contains('hidden')) {
                this.reveal(x + ((y - 1) * this.width));
            }
        }
    }
    flagged(cell_ID) {
        if (this.cellList[cell_ID].classList.contains('flagged')) {
            this.cellList[cell_ID].classList.remove('flagged');
            this.flagSet--;
            if (this.cellList[cell_ID].innerText === 'M')
                this.trueFlag--;
        }
        else {
            this.cellList[cell_ID].classList.add('flagged');
            this.flagSet++;
            if (this.cellList[cell_ID].innerText === 'M')
                this.trueFlag++;
        }
        this.updateAffichage((this.minenbr - this.flagSet).toString());
        if (this.trueFlag === this.minenbr)
            console.log("gagné");
    }
    updateAffichage(str) {
        this.affichage.innerText = 'Mine remaining : ' + str;
    }
    /**
     * Add click action to the cells
     */
    setClickAction() {
        // foreach cell
        for (let cell_ID = 0; cell_ID < this.cellList.length; cell_ID++) {
            // Add function
            this.cellList[cell_ID].addEventListener('click', () => {
                this.reveal(cell_ID);
            });
            this.cellList[cell_ID].addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.flagged(cell_ID);
            });
        }
    }
    lost() {
        for (let cell_ID = 0; cell_ID < this.mineList.length; cell_ID++) {
            this.cellList[this.mineList[cell_ID]].classList.remove('hidden');
        }
    }
}
//# sourceMappingURL=main.js.map