
import server.ARTServer;

/**
 * The main class for WebART. 
 */
public class Main {

    // Set the server settings
    final static int SERVER_PORT = 2999;
    final static String JERSEY_CONTEXT_PATH = "/api";
    final static String JERSEY_PACKAGE = "controllers";
    final static String RESOURCES_CONTEXT_PATH = "/"; 
    final static String RESOURCES_DIRECTORY = "src/main/resources";

    /**
     * The main method for WebART.
     * 
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        // create the server with the settings defined at the beginning of the class
        ARTServer server = new ARTServer(
            SERVER_PORT, 
            JERSEY_CONTEXT_PATH, 
            JERSEY_PACKAGE, 
            RESOURCES_CONTEXT_PATH, 
            RESOURCES_DIRECTORY
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