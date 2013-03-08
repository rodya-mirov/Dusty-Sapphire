using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TileEngine;
using TileEngine.Utilities;

namespace Dusty_Sapphire.Maps
{
    public class SapphireMapCell : MapCell, Copyable<SapphireMapCell>
    {
        public int Height { get { return Tile.HeightTileOffset * (HighestLevel - LowestLevel); } }

        private int HighestLevel = 0;
        private int LowestLevel = 0;

        /// <summary>
        /// Default constructor, where one must set a base tile and an
        /// elevation (no default arguments available).
        /// </summary>
        /// <param name="baseTile"></param>
        /// <param name="elevation"></param>
        public SapphireMapCell(int baseTile, int elevation)
            : base(baseTile)
        {
            this.VisualElevation = elevation;
        }

        /// <summary>
        /// Hidden constructor, where all the properties are set manually.
        /// Not for general consumption.
        /// </summary>
        protected SapphireMapCell()
            : base()
        {
        }

        public override void AddTile(int tileID, int level)
        {
            base.AddTile(tileID, level);

            LowestLevel = Math.Min(LowestLevel, level);
            HighestLevel = Math.Max(HighestLevel, level);
        }

        /// <summary>
        /// Creates a carbon-copy of this MapCell.
        /// </summary>
        /// <returns></returns>
        public new SapphireMapCell Copy()
        {
            SapphireMapCell output = new SapphireMapCell();
            output.VisualElevation = this.VisualElevation;

            output.Tiles = this.TilesCopy();

            output.HighestLevel = this.HighestLevel;
            output.LowestLevel = this.LowestLevel;

            return output;
        }
    }
}
