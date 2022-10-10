#ifndef LIST_H
#define LIST_H

#include <string>
using namespace std;

struct Node{
	string word;
	int length =  0;
	int frequency = 0;
	Node *next;
};

class LinkedList{
	private:
		Node *head;
	public:
		LinkedList();
		void insert(string);
		bool find(string);
		//string findAndPrint(int, int);
		Node* deleteNode(string);
		void deleteList();
		void deleteAndFreeNode(string);
		string print();
		int length();
};


#endif
