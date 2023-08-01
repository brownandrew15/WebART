
import java.util.HashMap;
import java.util.Map;

import server.ARTServer;

/**
 * The main class for WebART. 
 */
public class Main {

    /**
     * The main method for WebART.
     * 
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        System.out.println("===== WebART =====");

        Map<String, String> params = generateDefaultParams();
        params = processCMDArgs(params, args);

        // create the server with the settings defined at the beginning of the class
        ARTServer server = new ARTServer(
            Integer.parseInt(params.get("port"))
        );

        // try to run the server - exceptions may be thrown if the port is already in use etc
        try {
            server.start();
        } catch (Exception e) {
            System.err.println("There was an error running the server");
            e.printStackTrace();
        }

    }

    /**
     * Creates a default set of arguments for the ARTServer object.
     */
    private static Map<String, String> generateDefaultParams() {
        Map<String, String> params = new HashMap<String, String>();
        params.put("port", "2999");
        return params;
    }


    /**
     * Reads the command line arguments and processes them into the arguments for the ARTServer.
     * 
     * @param params the ARTServer parameters map
     * @param args the command line arguments
     * @return the updated parameters map
     */
    private static Map<String, String> processCMDArgs(Map<String, String> params, String[] args) {

        for (int i=0; i < args.length; i = i + 2) {

            if (args[i].equals("-p")) {
                params.put("port", args[i+1]);
            }

        }

        return params;

    }


}