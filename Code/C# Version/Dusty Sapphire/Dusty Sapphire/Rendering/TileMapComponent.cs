using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using TileEngine;
using Dusty_Sapphire.Maps;

namespace Dusty_Sapphire.Rendering
{
    public class TileMapComponent<InGameObjectType> : DrawableGameComponent where InGameObjectType : InGameObject
    {
        private MapManager mapManager { get; set; }

        public TileMapComponent(SapphireGame game, MapManager map)
            : base(game)
        {
            this.mapManager = map;
        }

        protected override void LoadContent()
        {
            base.LoadContent();

            mapManager.LoadContent();
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);

            mapManager.Update(gameTime);
        }

        public override void Initialize()
        {
            base.Initialize();

            mapManager.Initialize();
        }

        public override void Draw(GameTime gameTime)
        {
            base.Draw(gameTime);

            mapManager.Draw(gameTime);
        }
    }
}
