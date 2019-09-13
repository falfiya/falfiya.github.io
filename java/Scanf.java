import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.BufferedReader;
import java.io.IOException;

/**
 * A hack-of-a BufferedReader which does NOT block indefinitely when reading.
 */
class NonblockingBufferedReader {
  // NOTE: LinkedBlockingQueue is threadsafe!
  private final BlockingQueue<String> lines = new LinkedBlockingQueue<String>();

  // we done reading the input stream on the background thread?
  private boolean closed = false;

  Thread backgroundReaderThread = null;

  public NonblockingBufferedReader(InputStream input) {
    this(new InputStreamReader(input));
  }

  public NonblockingBufferedReader(final Reader reader) {
    backgroundReaderThread = new Thread(new Runnable(){
      @Override
      public void run() {
        BufferedReader bfrdReader = null;
        try {
          bfrdReader = (reader instanceof BufferedReader ? (BufferedReader)reader : new BufferedReader(reader));
          while ( !Thread.interrupted() ) {
            String line = bfrdReader.readLine();
            if (line == null) {
              break;
            }
            lines.add(line);
          }
        } catch (IOException e) {
          throw new RuntimeException(e);
        } finally {
          closed = true;
          if ( bfrdReader!=null ) {
            try {
              bfrdReader.close();
            } catch(IOException e) {
              throw new RuntimeException(e);
            }
        }
      }
    }});
    // The JVM exits when the only running threads are all daemons.
    backgroundReaderThread.setDaemon(true); 
    backgroundReaderThread.start();
  }

  /**
   * Returns the next line, blocking for 500 milliseconds for input then returns null.
   * If the background reader thread is interrupted then returns null.
   */
  public String readLine() throws IOException {
    try {
      return closed && lines.size()==0 ? null : lines.poll(500L, TimeUnit.MILLISECONDS);
    } catch (InterruptedException e) {
      throw new IOException("The BackgroundReaderThread was interrupted!");
    }
  }

  /** 
   * Closes this reader (by interrupting the background reader thread).
   */
  public void close() {
    if( backgroundReaderThread!=null ){ 
      backgroundReaderThread.interrupt();
      backgroundReaderThread = null;
    }
  }
}

/**
 * java -cp C:\Java\home\classes krc.utilz.io.test.NonblockingBufferedReaderTest
 * echo "Hello World" | java -cp C:\Java\home\classes krc.utilz.io.test.NonblockingBufferedReaderTest
 * type NonblockingBufferedReader.java | java -cp C:\Java\home\classes krc.utilz.io.test.NonblockingBufferedReaderTest
 */
class Scanf {
  public static void main(String... args) {
    try {
      System.err.println("DEBUG: opening NonblockingBufferedReader on stdin ...");
      NonblockingBufferedReader reader = null;
      try {
        reader = new NonblockingBufferedReader(System.in);
        String line = null;
        while ( (line=reader.readLine()) != null ) {
          System.out.println(line);
        }
      } finally {
        reader.close();
      }
      System.err.println("DEBUG: All Done.");
    } catch (java.io.IOException e) {
      e.printStackTrace();
    }
    //System.exit(1);
  }
}
