<?php session_start(); ?>
<html>

<head>
    <title>Tower Defense Timux</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="life_div">
        <div id="life_bar">
            <h2 id="life_info">Vie Restantes : 20</h2>
            <div id="life_value">

            </div>
        </div>
        <hr>
    </div>
    <div id="grille">

    </div>
    <div id="build_footer">
    <div class="turret" id="tourelle_1">
        <div class="cost">
            50$
        </div>
        <div>
            <img src="./turret_1.png" alt="">
        </div>
        <div class="description">
            Mitrailleuse
        </div>
    </div>
    <div class="turret" id="tourelle_2">
        <div class="cost">
            50$
        </div>
        <div>
            <img src="./turret_1.png" alt="">
        </div>
        <div class="description">
            Lance-flamme
        </div>
    </div>
    </div>
    <script src="jquery-3.6.0.min.js"></script>
    <script src="laby.js"></script>
</body>

</html>