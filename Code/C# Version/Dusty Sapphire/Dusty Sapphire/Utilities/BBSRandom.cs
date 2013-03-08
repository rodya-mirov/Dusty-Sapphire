using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Dusty_Sapphire.Utilities
{
    public class BBSRandom
    {
        public static long largePrime = 19999999; //believe it or not, this is prime

        /// <summary>
        /// The delightfully named Blum-Blum-Shub algorithm; square it and mod out
        /// by a large prime.  THe advantage is that it's cryptographically secure
        /// (assuming sqrt mod p is hard, which is usually assumed true), and in
        /// particular, you shouldn't see any repeated patterns from reuse (that is,
        /// if you do x_{n+1} = findRandomNumber(x_n);)
        /// 
        /// The disadvantage, as far as I know, is that I have no idea what the
        /// distribution is.
        /// </summary>
        /// <param name="seed"></param>
        /// <returns></returns>
        public static int getRandomNumber(int seed)
        {
            long bigSeed = seed;
            int output = 0;

            for (int i = 0; i < 32; i++)
            {
                output <<= 1;

                bigSeed = (bigSeed * bigSeed) % largePrime;
                output += (int)(bigSeed & 1L);
            }

            return output;
        }

        /// <summary>
        /// This generates a fair coinflip, based on a starting seed.
        /// 
        /// The general principal is simple.  If successive flips are
        /// independent but biased, then flip twice, and report the
        /// following result:
        ///     1) If we got HH or TT, try again
        ///     2) If we got HT, return H
        ///     3) If we got TH, return T
        /// </summary>
        /// <param name="seed"></param>
        /// <returns></returns>
        public static bool coinFlip(int seed)
        {
            long bigSeed = seed;
            if (bigSeed == 0L || bigSeed == 1L)
                bigSeed = largePrime / 2L;

            while (true)
            {
                bigSeed = (bigSeed * bigSeed) % largePrime;
                long first = bigSeed & 1L;

                bigSeed = (bigSeed * bigSeed) % largePrime;
                long second = bigSeed & 1L;

                if (first != second)
                    return first == 1L;

                if (bigSeed == 0L || bigSeed == 1L)
                    throw new InvalidOperationException("Seed generated bad values, somehow.  Bad seed was: " + seed);
            }
        }
    }
}
