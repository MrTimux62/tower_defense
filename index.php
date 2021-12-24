<?php session_start(); ?>
<html>

<head>
    <title>Tower Defense Timux</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="life_div">
        <div id="life_bar">
            <h2 id="life_info" name='100'>Vie Restantes : 100</h2>
            <div id="life_value" style="width: 100%;">

            </div>
        </div>
        <hr>
    </div>
    <div id="money">
        <h1>80$</h1>
    </div>
    <div id="grille">
        
    </div>
    <?php require_once './turret_menu.php' ?>
    <script src="jquery-3.6.0.min.js"></script>
    <script src="laby.js"></script>
</body>

</html>