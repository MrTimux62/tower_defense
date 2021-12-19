

let ligne1 = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
let ligne2 = ['A', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'X', 'X']
let ligne3 = ['X', 'X', 'X', 'O', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'X', 'O', 'X', 'X']
let ligne4 = ['X', 'X', 'X', 'O', 'X', 'X', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'X']
let ligne5 = ['X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'B']
let ligne6 = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
let full_lignes = [ligne1, ligne2, ligne3, ligne4, ligne5, ligne6]
let Xcord = 25;
let Ycord = 25;
let UnitX = 0;
let UnitY = 0;
let FinishX = 0;
let FinishY = 0;
let StartX = 0;
let StartY = 0;
let case_nb = 1;
let Top_Go, Right_Go, Bottom_Go;
let No_Bottom = 0;
let No_Top = 0;

$(document).ready(function () {

    function setMob(X, Y) {
        UnitX = X + 12.5;
        UnitY = Y - 37.5;
    }

    function setFinish(X, Y) {
        FinishX = X;
        FinishY = Y - 50;
    }

    function moveUnit(X, Y) {
        $(".mob").animate({
            top: X + "px",
            left: Y + "px"
        }, 1000);
    }

    for (let index = 0; index < full_lignes.length; index++) {
        for (let index2 = 0; index2 < full_lignes[0].length; index2++) {
            if (full_lignes[index][index2] == 'X') {
                $("#grille").append("<div id='" + case_nb + "' style='position:absolute; left: " + Ycord + "; top: " + Xcord + "' class='case'></div>")
                case_nb++;
                Ycord = Ycord + 50;
            } else {
                Ycord = Ycord + 50;
            }
            if (full_lignes[index][index2] == 'A') {
                StartX = Xcord;
                StartY = Ycord;
                setMob(Xcord, Ycord);
            }
            if (full_lignes[index][index2] == 'B') {
                setFinish(Xcord, Ycord);
            }
        }
        Ycord = 25;
        Xcord = Xcord + 50;
    }

    $("#grille").append("<div style='position:absolute; left: " + UnitY + "; top: " + UnitX + "' class='mob'><div id='stats_mob'>5 unités</div></div>")
    $("#grille").append("<div style='position:absolute; left: " + FinishY + "; top: " + FinishX + "' class='finish'></div>")

    deplacement = setInterval(() => {
        Top_Go = 0;
        Bottom_Go = 0;
        Right_Go = 0;
        for (let index = 1; index < case_nb; index++) {
            if (UnitY - 12.5 + "px" == $("#" + index).css("left") && UnitX - 62.5 + "px" == $("#" + index).css("top") || No_Top == 1) {
                Top_Go = 1;
            }
            if (UnitY - 12.5 + "px" == $("#" + index).css("left") && UnitX + 37.5 + "px" == $("#" + index).css("top") || No_Bottom == 1) {
                Bottom_Go = 1;
            }
            if (UnitY + 37.5 + "px" == $("#" + index).css("left") && UnitX - 12.5 + "px" == $("#" + index).css("top")) {
                Right_Go = 1;
            }
        }

        No_Bottom = 0;
        No_Top = 0;

        if (Top_Go != 1) {
            No_Bottom = 1;
            UnitX = UnitX - 50;
            moveUnit(UnitX, UnitY);
        } else if (Right_Go != 1) {
            UnitY = UnitY + 50;
            moveUnit(UnitX, UnitY);
        } else if (Bottom_Go != 1) {
            No_Top = 1;
            UnitX = UnitX + 50;
            moveUnit(UnitX, UnitY);
        } else {
            console.log("error");
        }

        if (UnitX - 12.5 + "px" == $(".finish").css("top") && UnitY - 12.5 + "px" == $(".finish").css("left")) {
            setMob(StartX, StartY);
            $(".mob").css("top", UnitX + "px");
            $(".mob").css("left", UnitY + "px");
        }
    }, 1500);

});