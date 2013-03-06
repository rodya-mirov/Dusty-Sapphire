using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TileEngine;
using Microsoft.Xna.Framework;

namespace Dusty_Sapphire.Maps
{
    public class MapManager : TileMapManager<InGameObject, MapCell, GameMap>
    {
        protected readonly List<InGameObject> managedObjects = new List<InGameObject>();

        public MapManager(Game game, String contentLocation)
            : base(game, contentLocation)
        {
        }

        public override void Initialize()
        {
            base.Initialize();

            managedObjects.Clear();
        }

        public override void LoadContent()
        {
            base.LoadContent();
        }

        protected override IEnumerable<InGameObject> InGameObjects()
        {
            foreach (InGameObject obj in managedObjects)
                yield return obj;
        }

        /// <summary>
        /// Returns true if and only if the supplied points are adjacent (that is,
        /// one coordinate is shared and the other differs by exactly 1).
        /// Note it returns false if the supplied points are the same.
        /// </summary>
        /// <param name="startX"></param>
        /// <param name="startY"></param>
        /// <param name="endX"></param>
        /// <param name="endY"></param>
        /// <returns></returns>
        public override bool CanMoveFromSquareToSquare(int startX, int startY, int endX, int endY)
        {
            return Math.Abs(startX - endX) + Math.Abs(startY - endY) == 1;
        }

        /// <summary>
        /// Just enumerates all adjacent points.  There is an assumption that if
        /// it is possible to move from (X,Y) to (A,B), then (A,B) will be returned
        /// from GetAdjacentPoints(X,Y)
        /// </summary>
        /// <param name="X"></param>
        /// <param name="Y"></param>
        /// <returns></returns>
        public override IEnumerable<Point> GetAdjacentPoints(int X, int Y)
        {
            yield return new Point(X - 1, Y);
            yield return new Point(X + 1, Y);
            yield return new Point(X, Y - 1);
            yield return new Point(X, Y + 1);
        }

        public bool IsPaused { get; private set; }
        public void TogglePause()
        {
            IsPaused = !IsPaused;
        }

        public override Color CellTint(int x, int y)
        {
            return Color.White;
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);
        }
    }
}
