    
    var game = new Phaser.Game(640, 360, Phaser.AUTO, '', { preload: this.preload, create: create, update: update });

    function preload() {

        game.load.tilemap('keeper', 'assets/Endless_keeper.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/warTileset_32x32.png');
        game.load.image('player', 'assets/Keeper32.png');
        game.load.image('btnAtras', 'assets/botonAtras.png');
        game.load.spritesheet('gamepad', 'assets/joystick/gamepad_spritesheet.png',100,100);
    }

    var map;
    var layer;
    var p;
    var cursors;

    function create() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('keeper');

    map.addTilesetImage('EndlessKeeper-World1', 'tiles');

    map.setCollision(12);
    map.setCollision(15);
    map.setCollision(9);
    map.setTileIndexCallback(9, hitCoin, this);
    
    layer = map.createLayer('World1');

    // layer.debug = true;

    layer.resizeWorld();

    p = game.add.sprite(32, 200, 'player');
    // Boton atras
    // var btn = game.add.button(10, 10, 'btnAtras', hitCoin, 2,1,0);
    // btn.anchor.setTo(0,0);
    // btn.fixedToCamera = true;
    game.physics.enable(p);

    game.physics.arcade.gravity.y = 350;

    p.body.bounce.y = 0;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;
    game.camera.follow(p);
    cursors = game.input.keyboard.createCursorKeys();

    // zoom camera
    // game.camera.scale.x = 1.2;
    // game.camera.scale.y = 1.2;

    // Add the VirtualGamepad plugin to the game
    this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
        
    // Add a joystick to the game (only one is allowed right now)
    this.joystick = this.gamepad.addJoystick(102, 280,1, 'gamepad');
    
    // Add a button to the game (only one is allowed right now)
    this.button = this.gamepad.addButton(560, 280,0.7, 'gamepad');
    }
    
    function hitCoin(sprite, tile) {
        p.kill();
        return false;
    }

    function update() {

        game.physics.arcade.collide(p, layer);
        p.body.velocity.x = 0;

        if (cursors.up.isDown)
        {
            if (p.body.onFloor())
            {
                p.body.velocity.y = -160;
            }
        }

        if (this.joystick.properties.left)
        {
            p.body.velocity.x = -90;
            p.scale.setTo(-1,1);
        }
        else if (this.joystick.properties.right)
        {
            p.body.velocity.x = 90;
            p.scale.setTo(1,1);

        }

    }

