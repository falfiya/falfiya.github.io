#include <string>
#include <fstream>
#include <iostream>
using namespace std;

template<typename Key, typename Value>
struct MappedLinkedList {
	// ZII idiom
	struct Node {
		Key key;
		Value value;
		Node *next;
	};
	Node *root;
	Value &get(Key key) const noexcept {
		if (this->root == nullptr) {
			this->root = new Node{};
			this->root->key = key;
			return this->root;
		}
		if (this->root->key == key) {
			return this->root;
		}
		Node *previous = this->root;
		while (previous->next != nullptr) {
			if (previous->next->key == key) {
				return previous->next;
			}
			previous = previous->next;
		}
		// reached the end of the list and still haven't found the key
		// make a new one
		previous->next = new Node{};
		previous->next->key = key;
		return previous->next;
	}
};

struct SortedFrequenciesList {
	// doubly linked list
	struct Node {
		string word;
		size_t count;
		Node *prev;
		Node *next;
		// this > other
		bool operator>(Node &other) const noexcept {
			if (this->count == other.count) {
				if (this->word == other.word) {
					// SANITY: programmer error! do not compare this with this!
					__builtin_trap();
				}
				// if this.word is closer to the start of the alphabet
				if (this->word < other.word) {
					return true;
				}
			}
			return this->count > other.count;
		}
	};
	Node *root;
	void increase(string word) noexcept {
		Node *matching_node;
		// first find the node that matches word
		if (this->root == nullptr) {
			this->root = new Node{word, 0, nullptr, nullptr};
			matching_node = this->root;
			goto node_matched;
		} else {
			Node *current = this->root;
			while (true) {
				if (current->word == word) {
					matching_node = current;
					goto node_matched;
				}
				if (current->next == nullptr) {
					break;
				}
				current = current->next;
			}
			// got to the end of the list and couldn't find one :(
			// current is the last node in the list
			matching_node = new Node{word, 0, current, nullptr};
		}
node_matched:
		matching_node->count++;
		// the count of the node has been updated!
		// now we need to walk it backwards until it's in the right spot!
		while (true) {
			// a
			// b
			// c (matching_node)
			// d
			Node *const c = matching_node;
			Node *const b = c->prev;
			if (b == nullptr) {
				// c is already ranked as high as can be
				break;
			}
			if (!(*c > *b)) {
				// correct order. nothing to do
				break;
			}
			// swap b and c
			// this is a painful operation
			Node *const a = b->prev;
			Node *const d = c->next;
			{
				if (a != nullptr) {
					a->next = c;
				}
				c->prev = a;
			}
			{
				if (d != nullptr) {
					d->prev = b;
				}
				b->next = d;
			}
			{
				b->prev = c;
				c->next = b;
			}
		}
	}
};

using WordLengthList = MappedLinkedList<size_t, SortedFrequenciesList>;

int main(int argc, char **argv) {
	ifstream input{argv[1]};
	ofstream output{argv[2]};


}
