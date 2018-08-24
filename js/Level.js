    
    var game = new Phaser.Game(640, 360, Phaser.AUTO, '', { preload: this.preload, create: create, update: update });

    preload: function preload() {

        game.load.tilemap('keeper', 'assets/Endless_keeper.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/warTileset_32x32.png');
        game.load.image('player', 'assets/Keeper32.png');

    }

    var map;
    var layer;
    var p;
    var cursors;

    function create() {

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
    game.physics.enable(p);

    game.physics.arcade.gravity.y = 350;

    p.body.bounce.y = 0;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;
    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();;

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

        if (cursors.left.isDown)
        {
            p.body.velocity.x = -90;
            p.scale.setTo(-1,1);
        }
        else if (cursors.right.isDown)
        {
            p.body.velocity.x = 90;
            p.scale.setTo(1,1);

        }

    }

