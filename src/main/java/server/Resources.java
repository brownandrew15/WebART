package server;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

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

    /**
     * Returns the path to the external resources.
     * 
     * @return the external resources path
     */
    public static String getExternalResourcesDir() {
        return getStaticResourcesDir() + "/external";
    }

    /**
     * Returns the path to the internal resources.
     * 
     * @return the internal resources path
     */
    public static String getInternalResourcesDir() {
        return getStaticResourcesDir() + "/internal";
    }


    public static String readFromJar(String file) throws IOException {
        file = "static_resources/" + file;
        InputStream inputStream = Resources.class.getResourceAsStream(file);
        if (inputStream == null) {
            // this is how we load file within editor (eg eclipse)
            inputStream = Resources.class.getClassLoader().getResourceAsStream(file);
        }
        StringBuilder sb = new StringBuilder();
        try (
            Reader reader = new BufferedReader(
                new InputStreamReader(inputStream, StandardCharsets.UTF_8)
            )
        ) {
            int c = 0;
            while ((c = reader.read()) != -1) {
                sb.append((char) c);
            }
        } catch (Exception e) {
            throw new IOException("File " + file + " could not be read");
        }
        return sb.toString();
    }


    /**
     * Reads the file as a String.
     * 
     * @param filepath the file to read
     * @return the file content
     * @throws FileNotFoundException if the file could not be read
     */
    public static String readFile(String filepath) throws FileNotFoundException {
        StringBuilder sb = new StringBuilder();
        List<String> lines = readFileLines(filepath);
        for (String line : lines) {
            sb.append(line);
            sb.append("\n");
        }
        return sb.toString();
    }

    /**
     * Reads the file into a list of lines.
     * 
     * @param filepath the file to read
     * @return the list of the file's lines
     * @throws FileNotFoundException if the file could not be read
     */
    public static List<String> readFileLines(String filepath) throws FileNotFoundException {
        List<String> lines = new ArrayList<String>();
        File myObj = new File(filepath);
        Scanner myReader = new Scanner(myObj);
        while (myReader.hasNextLine()) {
            String data = myReader.nextLine();
            lines.add(data);
        }
        myReader.close();
        return lines;
    }





    /**
     * Creates a directory with a given name in the current directory.
     * 
     * @param name the name of the directory
     * @return True if the directory was created, false otherwise
     */
    public static boolean createDir(String name) {
        return createDir(name, "");
    }

    /**
     * Creates a directory with a given name in the current directory.
     * 
     * @param name the name of the directory
     * @param inDir the directory to create the new directory in
     * @return True if the directory was created, false otherwise
     */
    public static boolean createDir(String name, String inDir) {
        if (!(inDir.equals(""))) {
            inDir += "/";
        }
        File theDir = new File(inDir + name);
        if (!theDir.exists()){
            return theDir.mkdirs();
        }
        return false;
    }

    /**
     * Generates a random string with a given length.
     * The character set is all upper case, lower case and numeric characters.
     * 
     * @param length the length of the string to generate
     * @return the random string
     */
    private static String randomString(int length) {
        // define the character set
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            + "0123456789"
            + "abcdefghijklmnopqrstuvxyz";
        // create the String
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }

    /**
     * Creates a directory with a random 10 character name in the current directory.
     * 
     * @return the directory path, relative to the current directory
     */
    public static String createRandomDir() {
        return createRandomDir("");
    }

    /**
     * Creates a directory with a random name in the current directory.
     * 
     * @param length the length of the random name
     * @return the directory path, relative to the current directory
     */
    public static String createRandomDir(int length) {
        return createRandomDir("", length);
    }

    /**
     * Creates a directory with a random 10 character name.
     * 
     * @param inDir the directory to create the new directory in
     * @return the directory path
     */
    public static String createRandomDir(String inDir) {
        return createRandomDir(inDir, 10);
    }

    /**
     * Creates a directory with a random name.
     * 
     * @param inDir the directory to create the new directory in
     * @param length the length of the name
     * @return the directory path
     */
    public static String createRandomDir(String inDir, int length) {
        String dirName = randomString(length);
        while (!(createDir(dirName, inDir))) {
            dirName = randomString(10);
        }

        if (!(inDir.equals(""))) {
            inDir += "/";
        }
        return inDir + dirName;
    }

    /**
     * Creates a file.
     * 
     * @param filename the name of the file
     * @param location the location of the file
     * @param content the content to write in the file
     * @return the filepath
     * @throws IOException if there was an error creating or writing the file
     */
    public static String createFile(String filename, String location, String content) throws IOException {
        String filepath = createFile(filename, location);
        // write the 
        FileWriter myWriter = new FileWriter(filepath);
        myWriter.write(content);
        myWriter.close();
        return filepath;
    }

    /**
     * Creates a file.
     * 
     * @param filename the name of the file
     * @param location the location of the file
     * @return the filepath
     * @throws IOException if there was an error creating the file
     */
    public static String createFile(String filename, String location) throws IOException {
        if (!(location.equals(""))) {
            location += "/";
        }
        File f = new File(location + filename);
        f.createNewFile();
        return f.getAbsolutePath();
    }



}
