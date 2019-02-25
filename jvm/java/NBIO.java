import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

class NonblockingBufferedReader {
  final BlockingQueue<String> lines = new LinkedBlockingQueue<String>();
  volatile boolean closed = false;
  Thread backgroundReaderThread = null;

  public NonblockingBufferedReader(final BufferedReader bufferedReader) {
    backgroundReaderThread = new Thread(() -> {
      try {
        while (!Thread.interrupted()) {
          String line = bufferedReader.readLine();
          if (line == null) {
            break;
          }
          lines.add(line);
        }
      } catch (IOException e) {
        throw new RuntimeException(e);
      } finally {
        closed = true;
      }
    });
    backgroundReaderThread.setDaemon(true);
    backgroundReaderThread.start();
  }
  public String readLine() throws IOException {
    try {
      return closed && lines.isEmpty() ? null : lines.poll(500L, TimeUnit.MILLISECONDS);
    } catch (InterruptedException e) {
      throw new IOException("The BackgroundReaderThread was interrupted!", e);
    }
  }

  public void close() {
    if (backgroundReaderThread != null) {
      backgroundReaderThread.interrupt();
      backgroundReaderThread = null;
    }
  }
}

class NBIO {
  public static void main(String... args) throws IOException, InterruptedException {
    System.out.println("Init");
    NonblockingBufferedReader bufferedReader = new NonblockingBufferedReader(
      new BufferedReader(
        new InputStreamReader(System.in)
      )
    );
    long end=System.currentTimeMillis()+6*1000;
    while ((System.currentTimeMillis() < end)) {
      System.out.print("sleep");
      Thread.sleep(4 * 1000);
      System.out.println("read");
      System.out.println(bufferedReader.readLine());
    }
  }
}
