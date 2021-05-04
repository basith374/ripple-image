import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import texture from 'cloud500.jpg'

export const RippleImage = ({ src, style }) => {
  const ref = useRef()
  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    })
    ref.current.appendChild(app.view)
    const image = new PIXI.Sprite.from(src)
    image.width = window.innerWidth
    image.height = window.innerHeight
    app.stage.addChild(image)

    const displacementSprite = new PIXI.Sprite.from(texture)
    const displacementFilter = new PIXI.filters.DisplacementFilter(
      displacementSprite
    )
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    app.stage.addChild(displacementSprite)
    app.stage.filters = [displacementFilter]

    animate()

    function animate() {
      displacementSprite.x += 10
      displacementSprite.y += 4
      window.requestAnimationFrame(animate)
    }
  }, [])
  return <div ref={ref} style={style} />
}
