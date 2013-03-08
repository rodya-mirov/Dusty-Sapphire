using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TileEngine;
using Dusty_Sapphire.Utilities;

namespace Dusty_Sapphire.Maps
{
    public class GameMap : TileMap<SapphireMapCell>
    {
        protected override bool UseCaching { get { return true; } }

        public GameMap()
            : base(true, -512, 512, -512, 512)
        {
            sandTiles = new SapphireMapCell[6];
            for (int i = 0; i < sandTiles.Length; i++)
            {
                SapphireMapCell cell = new SapphireMapCell(i, i * 5);

                //cell.AddTile(10, 0); //"back-left"
                //cell.AddTile(12, 0); //"back-right"
                cell.AddTile(11, 0); //"front-left"
                cell.AddTile(13, 0); //"front-right"
                cell.AddTile(i, 1);

                sandTiles[i] = cell;
            }
        }

        private SapphireMapCell[] sandTiles;

        /// <summary>
        /// The "procedural generation" of this map is "sand."
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <returns></returns>
        public override SapphireMapCell MakeMapCell(int x, int y)
        {
            int seed = (x & 65535) + (y << 16); //combine the indices into a uniform seed (just least the LSBs from each to form a new number)
            int randomNumber = BBSRandom.getRandomNumber(seed);

            int index = (int)(randomNumber % sandTiles.Length);
            if (index < 0)
                index += sandTiles.Length;

            return sandTiles[index];
        }
    }
}
