controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 9 9 9 . . . . . 
        . . . . . . . 9 9 5 9 . . . . . 
        . . . 9 9 9 9 9 5 9 9 . . . . . 
        . . . . . . . 9 9 9 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -25
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let Enemy_Ship: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 2 2 7 . . . . . 
    . . . . . . . 2 2 a 7 . . . . . 
    . . . . . . 2 2 7 7 7 . . . . . 
    . . . 8 8 2 2 a a a 7 . . . . . 
    . . . . . 2 2 7 7 7 7 . . . . . 
    . . . 8 8 2 2 a a a 7 . . . . . 
    . . . . . . 2 2 7 7 7 . . . . . 
    . . . . . . . 2 2 a 7 . . . . . 
    . . . . . . . . 2 2 7 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
let Enemy_Speed = 20
info.setLife(5)
let Enemy_Spawn_Time = 2000
game.onUpdateInterval(5000, function () {
    Enemy_Speed += 5
    Enemy_Speed = Math.min(Enemy_Speed, 50)
    Enemy_Spawn_Time += -250
    Enemy_Spawn_Time = Math.max(Enemy_Spawn_Time, 500)
})
forever(function () {
    Enemy_Ship = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . . . . . . . 2 2 . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 2 2 3 . . . . . . . 
        . . . 2 2 2 2 3 3 . . . . . . . 
        . . . . . 2 2 2 3 . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . . 2 2 . . . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    Enemy_Ship.x = scene.screenWidth()
    Enemy_Ship.vx = 0 - Enemy_Speed
    Enemy_Ship.y = randint(10, scene.screenHeight() - 5)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.setColor(5, 10)
    statusbar.attachToSprite(Enemy_Ship)
    pause(Enemy_Spawn_Time)
})
