import Board from './classes/Board.js';


class Menu{
    static div: any;
    static board: Board;

    static setDiv(div: any){
        Menu.div = div;
    }

    /**
     * Return a HTML div with an ID, innerText and onclick action
     * @param {string} text - Text top put into the div
     * @param {string} id - HTML ID of the div
     * @param {string} action - On click function
     */
    static createBtn(text: string, id: string, action: () => void): object{
        let btn = document.createElement('div');
        btn.setAttribute("id",id);
        btn.innerText = text;
        btn.addEventListener("click", action);
        return btn;
    }

    /**
     * Display the game menu
     * @param {string} msg - Message to display
     */
    static displayMenu(msg: string){
        //Message display
        let messageBox = document.createElement('div');
        messageBox.innerText = msg;
        Menu.div.appendChild(messageBox);
        // easy btn
        Menu.div.appendChild(Menu.createBtn('easy','easy', () => {Menu.placeBoard(10,8,10);}));
        // medium btn
        Menu.div.appendChild(Menu.createBtn('medium','medium', () => {Menu.placeBoard(18,14,40);}));
        // hard btn
        Menu.div.appendChild(Menu.createBtn('hard','hard', () => {Menu.placeBoard(24,20,99);}));
    }

    /**
     * Remove the menu and place the board
     * @param {string} width - Width of the board
     * @param {string} height - Height of the board
     * @param {string} mineNbr - Number of mines
     */
    static placeBoard(width: number, height: number, mineNbr: number){
        Menu.div.innerHTML = '';
        Menu.board = new Board(width, height, mineNbr,Menu);
    }
}

let menu = new Menu();
Menu.setDiv(document.getElementById('menu'));
Menu.displayMenu('Play a game ?');








