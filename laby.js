

let ligne1 = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
let ligne2 = ['A', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'O', 'B']
let ligne3 = ['X', 'X', 'O', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'X', 'O', 'X', 'X', 'X', 'X', 'O', 'X']
let ligne4 = ['X', 'X', 'O', 'X', 'X', 'X', 'X', 'O', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'X', 'O', 'X']
let ligne5 = ['X', 'X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'X', 'X', 'X', 'O', 'X', 'O', 'X']
let ligne6 = ['X', 'X', 'O', 'X', 'X', 'O', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'O', 'X', 'O', 'X']
let ligne7 = ['X', 'X', 'O', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'X']
let ligne8 = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
let full_lignes = [ligne1, ligne2, ligne3, ligne4, ligne5, ligne6, ligne7, ligne8]
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
let selected_turret = "";
let selected_case = "";
let turret_rotation = 0;
let random_number = 0;
let random_number2 = 0;
let mob_cible = "";
let difficulty = 10;

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

    random_number2 = Math.floor((Math.random() * difficulty) + 10);
    $("#grille").append("<div style='position:absolute; left: " + UnitY + "px; top: " + UnitX + "px;' class='mob' name='" + random_number2 + "' id='mob_" + Math.floor((Math.random() * 100) + 1) + "'><div id='stats_mob'>"+random_number2+" unités</div></div>")
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
            difficulty = difficulty + 5;
            $("#life_info").html("Vie Restantes : " + (parseInt($("#life_info").attr('name')) - parseInt($(".mob").attr('name'))))
            $("#life_value").css("width", (parseInt($("#life_info").attr('name')) - parseInt($(".mob").attr('name'))) + "%")
            $("#life_info").attr('name', parseInt($("#life_info").attr('name')) - parseInt($(".mob").attr('name')))
            $(".mob").remove();
            setTimeout(() => {
                random_number2 = Math.floor((Math.random() * 30) + difficulty);
                $("#grille").append("<div style='position:absolute; left: " + StartX + "; top: " + StartY + "' class='mob' name='" + random_number2 + "' id='mob_" + Math.floor((Math.random() * 100) + 1) + "'><div id='stats_mob'>"+random_number2+" unités</div></div>")
                setMob(StartX, StartY);
                $(".mob").css("top", UnitX + "px");
                $(".mob").css("left", UnitY + "px");
                difficulty = difficulty + 5;
            }, 5000);
        }
    }, 1500);
    moneydrop = setInterval(() => {
        $("#money h1").text(parseInt($("#money h1").text()) + 1 + "$");
    }, 1000);

    $(".case").click(function (e) {
        e.preventDefault();
        console.log(selected_turret);
        if (selected_turret != "") {
            if ($(this).find('input').length == 0) {
                $(this).html("<img src='./img/tourelles/" + selected_turret + ".png'><input type='hidden' value='" + selected_turret + "'>");
                $("#money h1").text(parseInt($("#money h1").text()) - cost_turret + "$");
                $(".turret").css("background-color", "white");
                $(".case").css("cursor", "");
                $(this).attr("name", cost_turret / 50);
                $(this).css("transform", "rotate(" + turret_rotation + "deg)")
                selected_turret = "";
            }

        }
    });

    $(".case").hover(function () {
        // over
        selected_case = $(this).attr("id");
        if (selected_turret != "") {
            if ($(this).find('input').length == 0) {
                $(this).html("<img src='./img/tourelles/" + selected_turret + ".png'>");
                $(this).css("transform", "rotate(" + turret_rotation + "deg)")
            }
        }
    }, function () {
        // out
        selected_case = "";
        if (selected_turret != "") {
            if ($(this).find('input').length == 0) {
                $(this).html("");
                $(this).css("transform", "")
            }
        }

    }
    );

    $(document).keydown(function (e) {
        if (e.which = 82) {
            if (selected_case != "") {
                if (turret_rotation == 360) {
                    turret_rotation = 90;
                } else {
                    turret_rotation = turret_rotation + 90;
                }
                $("#" + selected_case).css("transform", "rotate(" + turret_rotation + "deg)")
            }
        }
    });



    $(".turret").hover(function () {
        // over
        if (parseInt($("#money h1").text()) >= $(this).attr("name")) {
            $(this).css("cursor", "pointer");
        } else {
            $(this).css("cursor", "not-allowed");
        }
    }
    );

    $(".turret").click(function (e) {
        e.preventDefault();
        if (parseInt($("#money h1").text()) >= $(this).attr("name")) {
            selected_turret = $(this).attr("id");
            cost_turret = $(this).attr("name");
            $(".turret").css("background-color", "white");
            $(this).css("background-color", "rgba(24, 179, 31, 0.4)");
            $(".case").css("cursor", "pointer");
        }
    });

    attack_turret = setInterval(() => {
        for (let index = 1; index < case_nb; index++) {
            if ($("#" + index).find('input').length) {
                $(".mob").each(function () {
                    if (parseInt($("#" + index).css("top")) - parseInt($(this).css("top")) < 100
                        && parseInt($("#" + index).css("top")) - parseInt($(this).css("top")) > -100
                        && parseInt($("#" + index).css("left")) - parseInt($(this).css("left")) < 100
                        && parseInt($("#" + index).css("left")) - parseInt($(this).css("left")) > -100) {
                        mob_cible = $(this).attr("id");
                        random_number = Math.floor((Math.random() * 1000) + 1);
                        $("#grille").append("<div class='fire' id='fire_" + random_number + "' style='top: " + (parseInt($("#" + index).css("top")) + 25) + "px; left:" + (parseInt($("#" + index).css("left")) + 25) + "px'></div>");
                        $("#fire_" + random_number).animate({
                            left: $("#" + mob_cible).css("left"),
                            top: $("#" + mob_cible).css("top"),
                            height: "20px",
                            width: "20px",
                            opacity: "0.5"
                        }, 500, function () {
                            $("#" + mob_cible).attr("name", parseInt($("#" + mob_cible).attr("name")) - parseInt($("#" + index).attr('name')));
                            $("#" + mob_cible + " div").text(parseInt($("#" + mob_cible).attr("name")) + " unités");
                            if (parseInt($("#" + mob_cible).attr("name")) <= 0) {
                                $("#" + mob_cible).remove();
                                $("#money h1").text(parseInt($("#money h1").text()) + 10 + "$");
                                setTimeout(() => {
                                    random_number2 = Math.floor((Math.random() * 30) + difficulty);
                                    $("#grille").append("<div style='position:absolute; left: " + StartX + "; top: " + StartY + "' class='mob' name='" + random_number2 + "' id='mob_" + Math.floor((Math.random() * 100) + 1) + "'><div id='stats_mob'>"+random_number2+" unités</div></div>")
                                    setMob(StartX, StartY);
                                    $(".mob").css("top", UnitX + "px");
                                    $(".mob").css("left", UnitY + "px");
                                    difficulty = difficulty + 5;
                                }, 5000);

                            }
                            $(this).remove();
                        });
                    }
                });

            }
        }
    }, 1000);
});

