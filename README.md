The Game of Concentration

In the game of Concentration, the player turns over pairs of cards in order to
find matching pairs. When all matched pairs are found, the game ends. The goal
is to use as few turns as possible.

This implementation uses a 4x4 board. The number of moves, elapsed time, and a
star ranking are displayed above the board, along with a reset button that
allows the user to quit the current game and start a new one. The user turns
cards over by clicking on them. After the second card is turned over, the code
determines if it is a correct or incorrect match, and animates the cards
accordingly. If it is an incorrect match, the cards are displayed briefly and
then turned back over in preparation for the next turn. At the end of the game,
a dialogue box is displayed with the final game statistics, asking the player
if they wish to play again.


Future goals

In future versions, the following items will be implemented:
  1. Make the board size adaptable.
  2. Fix the background colors for the stars and the reset button, which don't
     exactly match the background of the container.
  3. Add sounds for flipping a card over, correct matches, incorrect matches,
     and winning the game, to go along with the animations.
  4. Set the background color of the space below the footer to black.
