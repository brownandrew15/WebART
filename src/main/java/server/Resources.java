package server;

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







    public static boolean createDir(String name) {
        return createDir(name, ".");
    }

    public static boolean createDir(String name, String inDir) {
        File theDir = new File(inDir + "/" + name);
        if (!theDir.exists()){
            return theDir.mkdirs();
        }
        return false;
    }






    private static String randomString(int length) {
        // choose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            + "0123456789"
            + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }


    public static String createRandomDir() {
        return createRandomDir(".");
    }


    public static String createRandomDir(String inDir) {
        String dirName = randomString(10);
        while (!(createDir(dirName, inDir))) {
            dirName = randomString(10);
        }
        return inDir + "/" + dirName;
    }





    public static String createFile(String filename, String location, String content) throws IOException {
        String filepath = createFile(filename, location);
        // write the 
        FileWriter myWriter = new FileWriter(filepath);
        myWriter.write(content);
        myWriter.close();
        return filepath;
    }

    public static String createFile(String filename, String location) throws IOException {
        File f = new File(location + "/" + filename);
        f.createNewFile();
        return f.getAbsolutePath();
    }







}
