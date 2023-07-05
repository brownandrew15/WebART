
import server.ARTServer;

/**
 * The main class for WebART. 
 */
public class Main {

    // Set the server settings
    final static int SERVER_PORT = 2999;

    /**
     * The main method for WebART.
     * 
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        System.out.println("===== WebART =====");
        
        // create the server with the settings defined at the beginning of the class
        ARTServer server = new ARTServer(
            SERVER_PORT
        );


        // try to run the server - exceptions may be thrown if the port is already in use etc
        try {
            server.start();
        } catch (Exception e) {
            System.err.println("There was an error running the server");
            e.printStackTrace();
        }



    }


}