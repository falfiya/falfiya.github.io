#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

const string KEY_ABOVE("\033[1A" + KEY_EOL);

int getint() {
  string str{};
  getline(cin, str);
  try {
    return stoi(str);
  } catch (exception e) {
    cerr << '"' << str << "\" is not an integer\n";
    exit(1);
  }
}

char symbols[] = { 'A', '!', 'O', 'X', '.', '3', 'N', ']'};
int symbol_count = 8;

int main() {
  // take input
  initscr(); 
  clear();
  printw("What size do you want the matching game to be?\n");
  printw("Width: ");
  // cout << "Width: ";
  int width = getint();
  if (width < 0) {
    cerr << "Cannot have a negative width\n";
    exit(1);
  }
  cout << KEY_ABOVE << "Height: ";
  int height = getint();
  if (height < 0) {
    cerr << "Cannot have a negative height\n";
    exit(1);
  }
  int cardcount = width * height;
  cout << KEY_ABOVE << width << " x " << height << " = " << cardcount << " cards\n";
  if (height % 2) {
    cerr << "Since this game is about matching pairs, an odd number of cards won't work. Try again\n";
    exit(1);
  }

  // create and populate the board randomly
  srand(time(0));
  char* board = new char[cardcount];
  for (int i(0); i < cardcount; i++) {
    int idx = rand() % symbol_count;
    board[i] = symbols[idx];
    cout << board[i] << ' ';
    if (i % width == width - 1) {
      cout << endl;
    }
  }
  return 0;
}
