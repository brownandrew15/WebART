package server;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

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



    public static String createTempFile(String extension) {
        try {
            File file = File.createTempFile("webart_", "." + extension);
            return file.toString();
        } catch (IOException e) {
            return null;
        }
    }

    public static String createTempFile(String extension, String content) {
        try {
            String path = createTempFile(extension);
            BufferedWriter writer = new BufferedWriter(new FileWriter(path));
            writer.write(content);
            writer.close(); 
            return path;
        } catch (IOException e) {
            return null;
        }
    }

}
