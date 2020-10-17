template<typename T>
void one();

template<class T>
void two();

// typename and class in the template are interchangable

// even though you can use a struct and class declaration for basically the
// same thing, in this context, you cannot use struct
// template<struct T>
// void three();
