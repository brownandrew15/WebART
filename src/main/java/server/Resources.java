package server;

/**
 * Class to access the static resources of the server.
 */
public class Resources {
    
    /**
     * Returns the path of the static resources.
     * 
     * @return the static resources path
     */
    public static String getStaticResourcesDir() {
        return Resources.class.getClassLoader().getResource("static_resources").toExternalForm();
    }

}
