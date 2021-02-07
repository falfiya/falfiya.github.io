// http://www.winprog.org/tutorial/simple_window.html
// fuck the win32 API for real, man
#include <windows.h>

const char g_szClassName[] = "clearicns";

// Step 4: the Window Procedure
LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {
   switch(msg) {
      case WM_CLOSE:
         DestroyWindow(hwnd);
         break;
      case WM_DESTROY:
         PostQuitMessage(0);
         break;
      default:
         return DefWindowProc(hwnd, msg, wParam, lParam);
   }
    return 0;
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
   //Step 1: Registering the Window Class
   WNDCLASSEX wc =
      { .cbSize        = sizeof(WNDCLASSEX)
      , .style         = 0
      , .lpfnWndProc   = WndProc
      , .cbClsExtra    = 0
      , .cbWndExtra    = 0
      , .hInstance     = hInstance
      , .hIcon         = LoadIcon(NULL, IDI_APPLICATION)
      , .hCursor       = LoadCursor(NULL, IDC_ARROW)
      , .hbrBackground = (HBRUSH)(COLOR_WINDOW+1)
      , .lpszMenuName  = NULL
      , .lpszClassName = g_szClassName
      , .hIconSm       = LoadIcon(NULL, IDI_APPLICATION)
      }
   ;

   if(!RegisterClassEx(&wc)) {
      MessageBox(NULL, "Window Registration Failed!", "Error!", MB_ICONEXCLAMATION | MB_OK);
      return 1;
   }

   // Step 2: Creating the Window
   // This is just kinda really bad API design but I get that things were
   // kept this way for backwards compatability or something
   HWND hwnd = CreateWindowEx
      ( WS_EX_CLIENTEDGE // extended styles
      , g_szClassName // I guess that's the class name that we just registered
      , "clearicns" // title
      , WS_OVERLAPPEDWINDOW | WS_MAXIMIZE // WS_MAXIMIZE gets ignored here for some dumb reason
      , CW_USEDEFAULT // x position
      , CW_USEDEFAULT // y position both are ints but this is a sentinal for using the default
      , 240 // width
      , 120 // height
      , NULL // parent hwnd
      , NULL // the hwnd that is the menu for this window or null if the window has no menu
      , hInstance // the "module" or win32 program running?
      , NULL // idk
      )
   ;

   if(hwnd == NULL) {
      MessageBox(NULL, "Window Creation Failed!", "Error!", MB_ICONEXCLAMATION | MB_OK);
      return 1;
   }

   ShowWindow(hwnd, nCmdShow);
   UpdateWindow(hwnd); // sends WM_PAINT

   // Step 3: The Message Loop
   MSG msg;
   while(GetMessage(&msg, NULL, 0, 0) > 0) {
      TranslateMessage(&msg);
      DispatchMessage(&msg);
   }
   return msg.wParam;
}
