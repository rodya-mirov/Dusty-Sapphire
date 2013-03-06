using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;
using TileEngine;
using Dusty_Sapphire.Rendering;
using Dusty_Sapphire.Maps;

namespace Dusty_Sapphire
{
    /// <summary>
    /// This is the main type for your game
    /// </summary>
    public class SapphireGame : Microsoft.Xna.Framework.Game
    {
        public bool useUnboundedFrameRate { get; private set; }

        private GraphicsDeviceManager graphics;
        private MapManager mapManager;
        private TileMapComponent<InGameObject> mapComponent;
        private FPSComponent frameRateViewer;

        private int preferredWindowedWidth, preferredWindowedHeight;

        SpriteFont segoe, bigSegoe;

        public SapphireGame()
        {
            this.IsMouseVisible = true;
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
        }

        /// <summary>
        /// Allows the game to perform any initialization it needs to before starting to run.
        /// This is where it can query for any required services and load any non-graphic
        /// related content.  Calling base.Initialize will enumerate through any components
        /// and initialize them as well.
        /// </summary>
        protected override void Initialize()
        {
            Tile.TileVisualOffsetX = 0;
            Tile.TileVisualOffsetY = 48;

            mapManager = new MapManager(this, @"Textures\TileSets\TileSheet");
            mapComponent = new TileMapComponent<InGameObject>(this, mapManager);
            Components.Add(mapComponent);

            frameRateViewer = new FPSComponent(this);
            Components.Add(frameRateViewer);

            Window.AllowUserResizing = true;
            Window.ClientSizeChanged += new EventHandler<EventArgs>(Window_ClientSizeChanged);

            preferredWindowedWidth = graphics.PreferredBackBufferWidth;
            preferredWindowedHeight = graphics.PreferredBackBufferHeight;

            if (useUnboundedFrameRate)
            {
                this.IsFixedTimeStep = false;
                this.graphics.SynchronizeWithVerticalRetrace = false;
                this.graphics.ApplyChanges();
            }

            base.Initialize();
        }

        void Window_ClientSizeChanged(object sender, EventArgs e)
        {
            mapManager.SetViewDimensions(Window.ClientBounds.Width, Window.ClientBounds.Height);
        }

        /// <summary>
        /// LoadContent will be called once per game and is the place to load
        /// all of your content.
        /// </summary>
        protected override void LoadContent()
        {
            mapManager.SetViewDimensions(graphics.PreferredBackBufferWidth, graphics.PreferredBackBufferHeight);

            segoe = Content.Load<SpriteFont>("Fonts/Segoe");
            mapManager.Font = segoe;

            bigSegoe = Content.Load<SpriteFont>("Fonts/BigSegoe");
            frameRateViewer.Font = bigSegoe;
        }

        /// <summary>
        /// UnloadContent will be called once per game and is the place to unload
        /// all content.
        /// </summary>
        protected override void UnloadContent()
        {
            // TODO: Unload any non ContentManager content here
        }

        /// <summary>
        /// Allows the game to run logic such as updating the world,
        /// checking for collisions, gathering input, and playing audio.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Update(GameTime gameTime)
        {
            handleKeyInput();

            base.Update(gameTime);
        }

        #region Keyboard Input Handling
        private readonly HashSet<Keys> keysHeld = new HashSet<Keys>();

        private void handleKeyInput()
        {
            KeyboardState ks = Keyboard.GetState();

            if (ks.IsKeyDown(Keys.Escape))
                this.Exit();

            cameraMovementKeyboard(ks);

            //space toggles pause
            if (ks.IsKeyDown(Keys.Space))
            {
                if (!keysHeld.Contains(Keys.Space))
                {
                    keysHeld.Add(Keys.Space);
                    mapManager.TogglePause();
                }
            }
            else
            {
                keysHeld.Remove(Keys.Space);
            }

            //F12 toggles fullscreen
            if (ks.IsKeyDown(Keys.F12))
            {
                if (!keysHeld.Contains(Keys.F12))
                {
                    ToggleFullScreen();
                    keysHeld.Add(Keys.F12);
                }
            }
            else
            {
                keysHeld.Remove(Keys.F12);
            }
        }

        private void cameraMovementKeyboard(KeyboardState ks)
        {
            if (ks.IsKeyDown(Keys.Left) || ks.IsKeyDown(Keys.A))
                Camera.Move(-2, 0);

            if (ks.IsKeyDown(Keys.Right) || ks.IsKeyDown(Keys.D))
                Camera.Move(2, 0);

            if (ks.IsKeyDown(Keys.Up) || ks.IsKeyDown(Keys.W))
                Camera.Move(0, -2);

            if (ks.IsKeyDown(Keys.Down) || ks.IsKeyDown(Keys.S))
                Camera.Move(0, 2);
        }
        #endregion

        /// <summary>
        /// Toggle full screen on or off.  Also keeps the camera so that it's centered on the same point
        /// (assuming the window itself is centered)
        /// </summary>
        private void ToggleFullScreen()
        {
            int newWidth, newHeight;
            int oldWidth = graphics.PreferredBackBufferWidth;
            int oldHeight = graphics.PreferredBackBufferHeight;

            if (graphics.IsFullScreen)
            {
                newWidth = preferredWindowedWidth;
                newHeight = preferredWindowedHeight;
            }
            else
            {
                newWidth = GraphicsAdapter.DefaultAdapter.CurrentDisplayMode.Width;
                newHeight = GraphicsAdapter.DefaultAdapter.CurrentDisplayMode.Height;
            }

            graphics.PreferredBackBufferWidth = newWidth;
            graphics.PreferredBackBufferHeight = newHeight;

            Point center = Camera.GetCenter();

            graphics.IsFullScreen = !graphics.IsFullScreen;

            this.mapManager.SetViewDimensions(newWidth, newHeight);

            Camera.CenterOnPoint(center);

            graphics.ApplyChanges();
        }

        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.Black);

            base.Draw(gameTime);
        }
    }
}
