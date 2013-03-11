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
        #region Borders
        private bool useBorders;
        protected override bool UseBorders { get { return useBorders; } }

        private bool useLeftBorder, useRightBorder, useTopBorder, useBottomBorder;

        protected override bool UseTopBorder { get { return useTopBorder; } }
        protected override bool UseBottomBorder { get { return useBottomBorder; } }
        protected override bool UseLeftBorder { get { return useLeftBorder; } }
        protected override bool UseRightBorder { get { return useRightBorder; } }

        public void SetTopBorder(bool use)
        {
            this.useTopBorder = use;
            this.useBorders = (useTopBorder || useBottomBorder || useRightBorder || useLeftBorder);
        }

        public void SetLeftBorder(bool use)
        {
            this.useLeftBorder = use;
            this.useBorders = (useTopBorder || useBottomBorder || useRightBorder || useLeftBorder);
        }

        public void SetRightBorder(bool use)
        {
            this.useRightBorder = use;
            this.useBorders = (useTopBorder || useBottomBorder || useRightBorder || useLeftBorder);
        }

        public void SetBottomBorder(bool use)
        {
            this.useBottomBorder = use;
            this.useBorders = (useTopBorder || useBottomBorder || useRightBorder || useLeftBorder);
        }

        protected override int BottomBorderTileIndex { get { return 73; } }
        protected override int TopBorderTileIndex { get { return 71; } }
        protected override int RightBorderTileIndex { get { return 72; } }
        protected override int LeftBorderTileIndex { get { return 70; } }
        #endregion

        public int Height { get { return Tile.HeightTileOffset * (HighestLevel - LowestLevel); } }

        private int HighestLevel = 0;
        private int LowestLevel = 0;

        /// <summary>
        /// Default constructor, where one must set an
        /// elevation (no default arguments available).
        /// 
        /// optionally, one may provide an array of border information;
        /// if not provided, no borders will be used.  If it is provided,
        /// the first is the left (NW), the second is the bottom (NE),
        /// the third is the right (SE), the fourth is the top (SW).
        /// </summary>
        /// <param name="elevation"></param>
        /// <param name="borderInformation"></param>
        public SapphireMapCell(int elevation)
            : base()
        {
            this.useBorders = false;
            this.useBottomBorder = false;
            this.useTopBorder = false;
            this.useRightBorder = false;
            this.useLeftBorder = false;

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

            output.useTopBorder = this.useTopBorder;
            output.useBottomBorder = this.useBottomBorder;
            output.useRightBorder = this.useRightBorder;
            output.useLeftBorder = this.useLeftBorder;

            return output;
        }
    }
}
