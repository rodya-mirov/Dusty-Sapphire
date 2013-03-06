using System;

namespace Dusty_Sapphire
{
#if WINDOWS || XBOX
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main(string[] args)
        {
            using (SapphireGame game = new SapphireGame())
            {
                game.Run();
            }
        }
    }
#endif
}

