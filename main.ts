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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
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
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
game.onUpdateInterval(2000, function () {
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
    Enemy_Ship.vx = -20
    Enemy_Ship.y = randint(10, scene.screenHeight() - 5)
})
