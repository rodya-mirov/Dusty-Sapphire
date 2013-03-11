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
        }

        #region Procedural Generation
        private const int numberOfSandTiles = 6;

        /// <summary>
        /// The "procedural generation" of this map is a random sand tile, sitting on a
        /// value-noise induced random height map.
        /// </summary>
        /// <param name="x">The square coordinate of the cell to generation, in x.</param>
        /// <param name="y">The square coordinate of the cell to generation, in y.</param>
        /// <returns></returns>
        public override SapphireMapCell MakeMapCell(int x, int y)
        {
            uint seed = BBSRandom.combineIntoSeed(x, y);
            int baseTile = BBSRandom.getRandomNumber(seed) % numberOfSandTiles;
            if (baseTile < 0)
                baseTile += numberOfSandTiles;

            int elevation = ValueNoiseHeight(x, y);

            SapphireMapCell outputCell = new SapphireMapCell(elevation);

            //add the top!
            outputCell.AddTile(baseTile, 0);

            int leftDrop = 1 + ((elevation - ValueNoiseHeight(x, y - 1)) >> 5);

            for (int i = -leftDrop; i < 0; i++)
                outputCell.AddTile(11, i); //left edge

            int rightDrop = 1 + ((elevation - ValueNoiseHeight(x + 1, y)) >> 5);
            for (int i = -rightDrop; i < 0; i++)
                outputCell.AddTile(13, i); //right edges

            //now for borders...
            if (elevation > ValueNoiseHeight(x - 1, y))
                outputCell.SetLeftBorder(true);

            if (elevation > ValueNoiseHeight(x, y + 1))
                outputCell.SetTopBorder(true);

            //these are slightly less important for readability, but still make things look better
            if (elevation > ValueNoiseHeight(x + 1, y))
                outputCell.SetRightBorder(true);

            if (elevation > ValueNoiseHeight(x, y - 1))
                outputCell.SetBottomBorder(true);

            //and we're done
            return outputCell;
        }

        //For the following, the maximum height differential will be
        //amplifier * (2 ^ (numberOfOctaves+1) - 1), so alter with care
        //and tiles will either be the same height, or differ by
        //at least amplifier pixels.
        private const int numberOfOctaves = 4;
        private const int amplifier = 8; //scale all heights up by this many pixels
        private const int maxDiff = amplifier * (2 << numberOfOctaves - 1);

        /// <summary>
        /// Determines the height at square (x,y), based on a value-noise calculation.
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <returns></returns>
        private int ValueNoiseHeight(int x, int y)
        {
            int output = baseNoise(x, y);

            /* Apologies for the incoming mass of bitwise operators.
             * To narrate, we want to scale a lot of things by factors of
             * 2^k, on level k, so we use a lot of <<k and >>k.
             * Here num << k means num * (2^k) and num >> k means
             * num / (2^k) (rounded toward zero).
             */
            for (int k = 1; k < numberOfOctaves; k++)
            {
                int leftX = (x >> k) << k; //x - (x % 2^k); the left edge of the 2^k by 2^k square
                int rightX = ((x >> k) + 1) << k; //x - (x % 2^k) + 2^k; the right edge of the 2^k by 2^k square

                int topY = (y >> k) << k; //y - (y % 2^k); the top edge of the 2^k by 2^k square
                int bottomY = ((y >> k) + 1) << k; //y - (y % 2^k) + 2^k; the bottom edge of the 2^k by 2^k square

                int ULnoise = baseNoise(leftX, topY) << k; //we want bigger octave noise to be more dominant, so they get scaled a lot
                int DLnoise = baseNoise(leftX, bottomY) << k; //we want bigger octave noise to be more dominant, so they get scaled a lot
                int URnoise = baseNoise(rightX, topY) << k; //we want bigger octave noise to be more dominant, so they get scaled a lot
                int DRnoise = baseNoise(rightX, bottomY) << k; //we want bigger octave noise to be more dominant, so they get scaled a lot

                int leftNoise = ((y - topY) * ULnoise + (bottomY - y) * DLnoise) >> k; //the convex combination of the left stuff according to the ys
                int rightNoise = ((y - topY) * URnoise + (bottomY - y) * DRnoise) >> k; //the convex combination of the right stuff according to the ys

                int octaveNoise = ((x - leftX) * leftNoise + (rightX - x) * rightNoise) >> k; //convex combination of the sides according to the x's

                output += octaveNoise;
            }

            return output * amplifier;
        }

        /// <summary>
        /// Turn x and y into a single seed, then flip a coin.
        /// If heads, return 1; else return -1.
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <returns></returns>
        public int baseNoise(int x, int y)
        {
            return BBSRandom.coinFlip(BBSRandom.combineIntoSeed(x, y)) ? 1 : 0;
        }
        #endregion
    }
}
