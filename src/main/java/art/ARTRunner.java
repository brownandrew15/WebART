package art;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import server.ARTServer;
import server.Resources;

/**
 * Interface between WebART and the ART.jar library that returns JSON data 
 */
public class ARTRunner {

    private String artLocation;

    /**
     * Creates an instance of the ART Runner.
     * 
     * @param artLocation the location of the art.jar file relative to webart.jar
     */
    public ARTRunner(String artLocation) {
        this.artLocation = artLocation;
    }

    /**
     * Creates the commands to run the eSOS rules mode of ART.
     * 
     * @param srcDir the location of the input files
     * @return the commands to run the mode
     */
    private List<String> runESOS(String srcDir) {
        System.out.println("Running eSOS with " + srcDir);
        List<String> commands = new ArrayList<String>();
        commands.add("cd " + srcDir);
        commands.add("java -jar " + this.artLocation + "/art.jar " + srcDir + "/webart.art !v4");
        return commands;
    }

    /**
     * Creates the commands to run the attribute grammar mode of ART.
     * 
     * @param srcDir the location of the input files
     * @return the commands to run this mode
     */
    private List<String> runAttributes(String srcDir) {
        System.out.println("Running attributes with " + srcDir);
        List<String> commands = new ArrayList<String>();
        commands.add("cd " + srcDir);
        commands.add("java -jar " + this.artLocation + "/art.jar webart.art !v3");
        commands.add("javac -cp \".:" + this.artLocation + "/art.jar\" ARTGeneratedParser.java ARTGeneratedLexer.java");
        commands.add("java -cp \".:" + this.artLocation + "/art.jar\" ARTV3TestGenerated webart.str +phaseAG");
        return commands;
    }


    private String commandsToString(List<String> commands) {
        StringBuilder sb = new StringBuilder();

        for (String command : commands) {
            sb.append(command);
            sb.append('\n');
        }

        return sb.toString();
    }


    private void createShellScript(String dir, List<String> commands) {
        try {
            String shContent = this.commandsToString(commands);
            Resources.createFile("run.sh", dir, shContent);
        } catch (IOException e) {

        }
    }


    /**
     * Saves the input from the front end into files.
     * 
     * @param dir the directory to save the input to
     * @param artSpecification the art specification
     * @param sampleProgram the sample program
     */
    private void saveInput(String dir, String artSpecification, String sampleProgram) {
        try {
            Resources.createFile("webart.art", dir, artSpecification);
            Resources.createFile("webart.str", dir, sampleProgram);
        } catch (IOException e) {

        }
    }


    /**
     * Runs ART using a specification and sample program.
     * 
     * @param artSpecification the ART Specification
     * @param sampleProgram the sample program
     * @return A JSON object that contains the input parameters and an array of the console output lines.
     */
    public JSONObject run(String artSpecification, String sampleProgram, int version) {

        String dir = Resources.createRandomDir();

        System.out.println(dir);

        this.saveInput(dir, artSpecification, sampleProgram);

        List<String> commands;
        if (version == 3) {
            commands = this.runAttributes(dir);
        }  else if (version == 4) {
            commands = this.runESOS(dir);
        } else {
            commands = new ArrayList<String>();
            commands.add("echo \"ART version " + String.valueOf(version) + " not recognised\"");
        }

        this.createShellScript(dir, commands);

        List<String> lines = ARTServer.getCMDRunner().run("sh ./" + dir + "/run.sh");
        
        // create the output JSON data
        JSONObject json = new JSONObject();

        JSONObject input = new JSONObject();
        input.put("artSpecification", artSpecification);
        input.put("sampleProgram", sampleProgram);


        JSONArray outputLines = new JSONArray();
        for (String line : lines) {
            outputLines.put(line);
        }

        json.put("input", input);
        json.put("output", outputLines);

        return json;

    }


    /**
     * Returns a JSON object contain the syntax highlighting colours and the 
     * keywords that should be highlighted for the ART specification.
     * 
     * @return A JSON object containing the syntax highlighting colours and keywords
     */
    public JSONObject getARTKeywords() {
        JSONObject json = new JSONObject();
    
        List<String> accessModifiers = Arrays.asList("public", "protected", "private", "static");
        json.put("purple", accessModifiers);

        List<String> types = Arrays.asList("String", "int", "void");
        json.put("green", types);

        List<String> others = Arrays.asList("return");
        json.put("red", others);
    
        return json;
    }




}
