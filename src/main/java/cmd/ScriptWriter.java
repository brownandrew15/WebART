package cmd;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import server.Resources;

/**
 * Writes the scripts to run ART in different modes for Unix and Windows systems.
 */
public class ScriptWriter {

    /**
     * Converts the list of commands to a single string with new lines ready 
     * to be written to a shell script or batch file.
     * 
     * @param commands the commands
     * @return a single string of commands for a file
     */
    private static String commandsToString(List<String> commands) {
        StringBuilder sb = new StringBuilder();
        for (String command : commands) {
            sb.append(command);
            sb.append('\n');
        }
        return sb.toString();
    }

    /**
     * Writes the script to a file with a given name.
     * 
     * @param commands the commands to write to the file
     * @param name the file name
     * @param dir the directory to save the file in
     */
    private static void writeToFile(List<String> commands, String name, String dir) {
        String content = commandsToString(commands);
        try {
            Resources.createFile(name, dir, content);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    /**
     * Writes the scripts for Unix and Windows that will run the eSOS mode of ART.
     * This creates two files with the given name with '.sh' and '.bat' extensions
     * that contain the Unix and Windows commands respectively.
     * 
     * @param name the name of the script
     * @param dir the directory to save the scripts in
     */
    public static void writeESOS(String name, String dir) {
        List<String> commands;

        // Unix/MacOS/Linux commands
        commands = new ArrayList<String>();
        commands.add("cd " + dir);
        commands.add("java -jar ../art.jar webart.art !v4");
        writeToFile(commands, name + ".sh", dir);

        // Windows Commands
        commands = new ArrayList<String>();
        commands.add("@echo off");
        commands.add("cd " + dir);
        commands.add("java -jar ../art.jar webart.art !v4");
        writeToFile(commands, name + ".bat", dir);
    }

    /**
     * Writes the scripts for Unix and Windows that will run the attribute grammar mode of ART.
     * This creates two files with the given name with '.sh' and '.bat' extensions
     * that contain the Unix and Windows commands respectively.
     * 
     * @param name the name of the script
     * @param dir the directory to save the scripts in
     */
    public static void writeAttributes(String name, String dir) {
        List<String> commands;

        // Unix/MacOS/Linux commands
        commands = new ArrayList<String>();
        commands.add("cd " + dir);
        commands.add("java -jar ../art.jar webart.art !v3");
        commands.add("javac -cp \".:../art.jar\" ARTGeneratedParser.java ARTGeneratedLexer.java");
        commands.add("java -cp \".:../art.jar\" ARTV3TestGenerated webart.str");
        writeToFile(commands, name + ".sh", dir);

        // Windows Commands
        commands = new ArrayList<String>();
        commands.add("@echo off");
        commands.add("cd " + dir);
        commands.add("java -jar ../art.jar webart.art !v3");
        commands.add("javac -Xlint -classpath .;../art.jar ARTGeneratedParser.java ARTGeneratedLexer.java");
        commands.add("java -classpath .;../art.jar ARTV3TestGenerated webart.str");
        writeToFile(commands, name + ".bat", dir);

    }

}
