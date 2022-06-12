#include <iostream>
#include <string>
using namespace std;

// 2 from mod(x, 4)=0
// 0 from mod(x, 4)=1
// 5 from mod(x, 4)=2
// 3 from mod(x, 4)=3
int sentry_code(int x) {
   int y = x % 4;
   if (y == 0) {
      return 2;
   }
   if (y == 1) {
      return 0;
   }
   if (y == 2) {
      return 5;
   }
   if (y == 3) {
      return 3;
   }
}

int doomsday_by_month[] {
   3,
   28,
   14,
   4,
   9,
   6,
   11,
   8,
   5,
   10,
   7,
   12,
};

string weekday[] {
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
};

bool is_leap(int year) {
   return (year % 4 == 0);
}

int wrap_(int day) {
   while (day<0){
      day+=7;
   }
   while (day>6){
      day-=7;
   }
}

int wrap(int day) {
   return (day+35)%7;
}

int main() {
   cout << "What year is it\n> ";
   int year;
   cin >> year;

   cout << "What month is it\n> ";
   int month;
   cin >> month;

   cout << "What day is it\n> ";
   int day;
   cin >> day;

   int firsttwo = year / 100;
   int lasttwo  = year % 100;

   int x1 = sentry_code(firsttwo);
   int x2 = lasttwo / 12;
   int x3 = lasttwo % 12;
   int x4 = x3 / 4;
   int x5 = x1 + x2 + x3 + x4;
   int d00msDAY = x5 % 7;

   if (is_leap(year)) {
      doomsday_by_month[0] += 1;
      doomsday_by_month[1] += 1;
   }

   int this_month = wrap(day - doomsday_by_month[month-1] + d00msDAY);

   cout << "today is " << weekday[this_month] << "\n";
}
